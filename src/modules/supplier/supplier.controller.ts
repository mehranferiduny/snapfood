import {
  Controller,
  Post,
  Body,

} from "@nestjs/common";
import { SinUpSupplierDto, SuppliarInfoDto } from "./dto/supplier.dto";
import { SupplierService } from "./supplier.service";
import { checkOtpDto } from "../auth/dto/auth.dto";
import { SppliarAuth } from "src/common/decorators/auth.decorator";


@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post("signUp")
  signUp(@Body() signUpDto: SinUpSupplierDto) {
    return this.supplierService.sinUp(signUpDto)
    
  }
  @Post("check-otp")
  checkOtp(@Body() checkOtpDto: checkOtpDto) {
    return this.supplierService.checkOtp(checkOtpDto)
    
  }
  @Post("supplimented-info")
  @SppliarAuth()
  supplimentedInfo(@Body() suppliarInfo: SuppliarInfoDto) {
    return this.supplierService.supplemntyInfomation(suppliarInfo)
    
  }

 

  
}
