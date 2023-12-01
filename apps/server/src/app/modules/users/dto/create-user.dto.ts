import { TUser } from '@libs/models';
import * as mongoose from 'mongoose';

export class CreateUserDto extends mongoose.Document implements TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
}
