import { Inject, Injectable, Scope } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { BasketService } from '../basket/basket.service';

@Injectable({scope:Scope.REQUEST})
export class PaymentService {
 constructor(
  @Inject(REQUEST) private readonly req:Request,
  private readonly basketService:BasketService
 ){}
  async getWayUrl(){
    const {id:userId}=this.req.user
    const basket=await this.basketService.getBasket()
    return basket
  }
}
