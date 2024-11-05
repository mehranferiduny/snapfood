import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserAdressEntity } from "./entity/addres.entity";
import { OtpEntity } from "./entity/otp.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([UserEntity,UserAdressEntity,OtpEntity])],
  controllers:[UserController],
  providers:[UserService,JwtService]
})
export class UserModule{}