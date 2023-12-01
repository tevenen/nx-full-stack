import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUserDto) {

    const createdUser = this.authService.register(user);

    return createdUser;
  }

  @Post('login')
  async login(@Body() credentials: {username: string, password: string}) {
    return await this.authService.login(credentials.username, credentials.password);
  }
}
