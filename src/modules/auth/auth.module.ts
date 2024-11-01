import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/entity/user.entity';
import { OtpEntity } from '../user/entity/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,OtpEntity])],
  controllers: [AuthController],
  providers: [AuthService,JwtService],
  exports:[AuthService,JwtService,TypeOrmModule]
})
export class AuthModule {}
