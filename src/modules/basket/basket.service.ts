import { Inject, Injectable, Scope } from "@nestjs/common";
import { BasketDto } from "./dto/basket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketEntity } from "./entities/basket.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { MenuService } from "../menu/service/menu.service";


@Injectable({scope:Scope.REQUEST})
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity) private readonly basketRepository:Repository<BasketEntity>,
    @Inject(REQUEST) private readonly req:Request,
    private readonly menuServise:MenuService
  ){}
 async addToBasketItem(createBasketDto: BasketDto) {
    const {id:userId}=this.req.user
    const {foodId}=createBasketDto
   await this.menuServise.checkExist(foodId) 
   let basketItem=await this.basketRepository.findOne({where:{foodId,userId}})
   if(basketItem){
    basketItem.count +=1
   }else{
    basketItem=this.basketRepository.create({
      foodId,
      userId,
      count:1,
    })
   }
   await this.basketRepository.save(basketItem)
   return {
    message:"add item food to basket"
   }
  }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
