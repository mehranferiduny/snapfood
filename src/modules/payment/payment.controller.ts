import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserAuth } from 'src/common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TypeData } from 'src/common/enum/type-data.enum';

@Controller('payment')
@ApiTags("Payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UserAuth()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  getWayUrl( @Body() paymentDto:CreatePaymentDto ){
   return this.paymentService.getWayUrl(paymentDto)
  }

  @Get('/verify')
  async verifayPayment(
    @Query("Authority") authority:string,
    @Query("Status") status:string,
    @Res() res:Response 
  ){
    const url=await this.paymentService.verify(authority,status)
    return res.redirect(url)
  }
}
