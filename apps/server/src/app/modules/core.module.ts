import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tevenen:milanjovke93@productcluster.hgtsopa.mongodb.net/?retryWrites=true&w=majority'
    ),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        algorithm: "HS256"
      }
    })
  ],
  exports: [
    MongooseModule,
    JwtModule
  ]
})
export class CoreModule {}
