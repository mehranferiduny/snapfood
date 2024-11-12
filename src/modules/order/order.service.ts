import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { BasketType } from '../basket/types/basket.type';
import { UserService } from '../user/user.service';
import { OrderItemStatus, OrderStatus } from './enum/statusOrder.enum';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';

@Injectable({scope:Scope.REQUEST})
export class OrderService {
  constructor(
    @Inject(REQUEST) private readonly req:Request,
    @InjectRepository(OrderEntity) private readonly orderRepository:Repository<OrderEntity>,
    private readonly dataSouers:DataSource,
    private readonly userService:UserService
  ){}
  async create(OrderDto: BasketType,paymentDto:CreatePaymentDto) {
    const {addresId,discription=undefined}=paymentDto
      const querryRuner=this.dataSouers.createQueryRunner()
      await querryRuner.connect()
    try {
     
      const {id:userId}=this.req.user
      const {total_discount_amount,payment_amount,foodList,total_amount}=OrderDto
       await this.userService.findAddres(addresId)
        
        let order=querryRuner.manager.create(OrderEntity,{
          addresId,
          discription,
          payment_amount,
          total_amount,
          discount_amount:total_discount_amount,
          userId,
          status:OrderStatus.Pending
        })

        order=await querryRuner.manager.save(OrderEntity,order)

        let orderItem:DeepPartial<OrderItemEntity>[]=[]
        for (const item of foodList) {
          orderItem.push({
            count: item.count,
            foodId:item.foodId,
            orderId:order.id,
            suppliarId:item.suppliarId,
            status:OrderItemStatus.Pending
          })
        }
        if(orderItem.length > 0){
            await querryRuner.manager.insert(OrderItemEntity,orderItem)
        }else{
          throw new BadRequestException("food list is empty")
        }


      await querryRuner.commitTransaction()
      await querryRuner.release()

        return{
          message:"order created sucsesfully"
        }

   } catch (error) {
     console.log(error)
     await querryRuner.rollbackTransaction()
     await querryRuner.release()
     throw error
   }
  }

  
}
