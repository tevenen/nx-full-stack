import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://tevenen:milanjovke93@productcluster.hgtsopa.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
