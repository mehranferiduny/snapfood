import { Inject, Injectable, Scope } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { BasketService } from '../basket/basket.service';
import { ZarinPallService } from '../http/zarinpall.service';
import { OrderService } from '../order/order.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable({scope:Scope.REQUEST})
export class PaymentService {
 constructor(
  @Inject(REQUEST) private readonly req:Request,
  private readonly basketService:BasketService,
  private readonly zarinService:ZarinPallService,
  private readonly orderService:OrderService,
 ){}
  async getWayUrl(paymentDto:CreatePaymentDto ){
    
    const {id:userId,email,phone}=this.req.user
    const basket=await this.basketService.getBasket()
    await this.orderService.create(basket,paymentDto)
    return this.zarinService.sendRequest({amount:basket.payment_amount,description:"payment order",user:{email,mobail:phone}})
  }
}
