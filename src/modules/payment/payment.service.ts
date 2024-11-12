import { Inject, Injectable, Scope } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { BasketService } from '../basket/basket.service';
import { ZarinPallService } from '../http/zarinpall.service';
import { OrderService } from '../order/order.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PayemntType } from './types/payment.type';

@Injectable({scope:Scope.REQUEST})
export class PaymentService {
 constructor(
  @Inject(REQUEST) private readonly req:Request,
  private readonly basketService:BasketService,
  private readonly zarinService:ZarinPallService,
  private readonly orderService:OrderService,
  @InjectRepository(PaymentEntity) private readonly paymentRepository:Repository<PaymentEntity>
 ){}
  async getWayUrl(paymentDto:CreatePaymentDto ){
    
    const {id:userId,email,phone}=this.req.user
    const basket=await this.basketService.getBasket()
   const order= await this.orderService.create(basket,paymentDto)
    const payment=await this.create({
      amount:basket.payment_amount,
      orderId:order.id,
      invoice_number:new Date().getTime().toString(),
      status:basket.payment_amount == 0,
      userId
    })

    if(payment.status){
           return { message:"payment suacsessfuly"}
    }else{

      return this.zarinService.sendRequest({amount:basket.payment_amount,description:"payment order",user:{email,mobail:phone}})
    }
  }

  async create(paymentType:PayemntType){
    const {amount,invoice_number,orderId,status,userId}=paymentType
    const payment = this.paymentRepository.create({
      amount,
      invoice_number,
      orderId,
      status,
      userId
    })
    return await this.paymentRepository.save(payment)
  }
}
