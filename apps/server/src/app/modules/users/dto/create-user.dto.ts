import { TUser } from '@libs/models';

export class CreateUserDto implements TUser{
  id: string;
  name: string;
}
