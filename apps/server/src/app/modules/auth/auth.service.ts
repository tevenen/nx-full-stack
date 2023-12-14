import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TUser } from '@libs/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}
  async register(user: CreateUserDto) {
    // const user = this.usersService.create(createUserDto);
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const userPayload: Partial<CreateUserDto> = {
      ...user,
      password: hashedPassword
    };
    return await this.usersService.create(userPayload);
  }

  async login(username: string, password: string) {
    let user: TUser;
    const loginFailedMessage: string = 'login.failed';
    try {
      user = await this.usersService.findOne(username);
    } catch(e) {
      throw new BadRequestException(loginFailedMessage);
    }
    if(!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(loginFailedMessage);
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      name: user.name
    })
    return {
      access_token: jwt
    };
  }

}
