import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { checkOtpDto, sendOtpDto } from './dto/auth.dto';
import {  singUpDto } from './dto/basic.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TypeData } from 'src/common/enum/type-data.enum';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sendOtp')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  sendOtp(@Body() sendOtpDto:sendOtpDto){
   return this.authService.sendOtp(sendOtpDto)
  }
  @Post('/checkOtp')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  checkOtp(@Body() checkOtpDto:checkOtpDto){
    return this.authService.checkOtp(checkOtpDto)
  }

}
