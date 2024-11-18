import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { UserEntity } from './User/user.entity';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelModule } from './Travel/travel.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'pufla12',
      database:'diplomski',
      autoLoadEntities:true,
      entities:[UserEntity],
      synchronize:true
    }),
    UserModule,
    AuthModule,
    TravelModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Diplomski'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
