import { ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';

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
import { OrderStatus } from '../order/enum/statusOrder.enum';

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

      const {authority,code,gatewayURl}=await this.zarinService.sendRequest({amount:basket.payment_amount,description:"payment order",user:{email,mobail:phone}})
       payment.authority=authority
       await this.paymentRepository.save(payment)
       return{
        gatewayURl,
        code
       }   
   
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


  async verify(authority:string,status:string){
    const payment=await this.paymentRepository.findOneBy({authority})
    if(!payment) throw new NotFoundException()
      if(payment.status) throw new ConflictException("already verifiyd")
        if(status==="OK"){
          const order=await this.orderService.findOne(payment.orderId)
          order.status=OrderStatus.Paid
          await this.orderService.save(order)
          payment.status=true
        }else{
        return "http://forntendUrl.com/payment?status=failed"
        }
        await this.paymentRepository.save(payment)
        return "http://forntendUrl.com/payment?status=secsess"
  }
 
}
