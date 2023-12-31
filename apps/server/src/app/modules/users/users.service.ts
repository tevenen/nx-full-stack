import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TUser } from '@libs/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<TUser>,
              private jwtService: JwtService) {
  }

  async create(createUserDto: Partial<CreateUserDto>) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll() {
    return (await this.userModel.find()).map(item => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
        username: item.username
      }
    });
  }

  async findOne(username: string): Promise<TUser> {
    let user: TUser;
    try {
      user = await this.userModel.findOne({username}) || await this.userModel.findOne({email: username});
    } catch (e) {
      throw new NotFoundException('User not found!');
    }
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.name,
      password: user.password
    };
  }

  async findById(id: string): Promise<Partial<TUser>> {
    let user: TUser;
    try {
      user = await this.userModel.findById(id);
    } catch (e) {
      throw new NotFoundException('User not found!');
    }
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.name
    };
  }

  async currentUser(jwt: string): Promise<Partial<TUser>> {
    const decoded = await this.jwtService.decode(jwt);
    return this.findById(decoded.id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UpdateUserDto = await this.findById(id);
    user.name = updateUserDto.name;
    user.save();
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException('Could not delete user!', HttpStatus.NOT_FOUND);
    }
  }

  async checkUsername(username: string) {
    try {
      const users = await this.userModel.find({username});
      return users.length === 0;
    } catch (e) {
      return false;
    }
  }

  async checkEmail(email: string) {
    try {
      const users = await this.userModel.find({email});
      return users.length === 0;
    } catch (e) {
      return false;
    }
  }
}
