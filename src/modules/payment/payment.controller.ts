import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserAuth } from 'src/common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags("Payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UserAuth()
  getWayUrl(){
   return this.paymentService.getWayUrl()
  }
}
