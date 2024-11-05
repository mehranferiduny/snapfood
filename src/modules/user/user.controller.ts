import { Body, Controller, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UpdateUserDto, UserSignUpDto } from "./dto/user.dto";
import { TypeData } from "src/common/enum/type-data.enum";
import { checkOtpDto } from "../auth/dto/auth.dto";
import { UserAuth } from "src/common/decorators/auth.decorator";

@Controller("User")
@ApiTags("User")
export class UserController{
  constructor(private readonly userService:UserService){}
 
  @Post()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  singUp(@Body()signUpDto:UserSignUpDto){
   return this.userService.signUp(signUpDto)
  }

  @Post('check-otp')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  checkOtp(@Body() checkDto:checkOtpDto){
    return this.userService.checkOtp(checkDto)
  }

  @Post('updateInfo')
  @UserAuth()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  update(@Body() updateDto:UpdateUserDto){
    return this.userService.update(updateDto)
  }
} 