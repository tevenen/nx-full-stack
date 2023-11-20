import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TUser } from '@libs/models';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<TUser>) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll() {
    return (await this.userModel.find()).map(item => {
      return {
        id: item.id,
        name: item.name
      }
    });
  }

  async findOne(id: string): Promise<TUser> {
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
      name: user.name
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UpdateUserDto = await this.findOne(id);
    user.name = updateUserDto.name;
    user.save();
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException('Could not delete user!', HttpStatus.NOT_FOUND);
    }
  }
}
