import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { SppliarAuth } from 'src/common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';


@Controller('order')
@ApiTags("Order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @SppliarAuth()
  getOrderSupp(){
    return this.orderService.getOrderSupliar()
  }
  
}
