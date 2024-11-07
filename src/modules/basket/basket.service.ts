import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { BasketDto, DiscountDto } from "./dto/basket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketEntity } from "./entities/basket.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { MenuService } from "../menu/service/menu.service";
import { DiscountEntity } from "../discount/entities/discount.entity";


@Injectable({scope:Scope.REQUEST})
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity) private readonly basketRepository:Repository<BasketEntity>,
    @InjectRepository(DiscountEntity) private readonly discountRepository:Repository<DiscountEntity>,
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

  async removeItemInBasket(createBasketDto: BasketDto) {
    const {id:userId}=this.req.user
    const {foodId}=createBasketDto
   await this.menuServise.checkExist(foodId) 
   let basketItem=await this.basketRepository.findOne({where:{foodId,userId}})
   if(basketItem){
    console.log(basketItem.count <= 1)
    if(basketItem.count <= 1){
      await this.basketRepository.delete({id:basketItem.id})
    }else{
      basketItem.count -=1
      await this.basketRepository.save(basketItem)
    }
   
    return {
     message:"remove item food in basket"
    }
   }
   throw new NotFoundException("item food notFound!")
 
  }

 async addDiscountBasket(discountDto:DiscountDto) {
    const {code}=discountDto
    const {id:userId}=this.req.user
   
    const discount=await this.discountRepository.findOneBy({code})
    if(!discount) throw new NotFoundException("discount code notFound!")
      const basketDiscount=await this.basketRepository.findOne({
    where:{userId,discountId:discount.id}})
    if(basketDiscount) throw new BadRequestException("Alreday uesd Discount")

      if(discount.suppliarId){
        const DiscountOfSuppliar=await this.basketRepository.findOne({
          relations:{discount:true},
          where:{
            userId,
            discount:{
              suppliarId:discount.suppliarId
            }
          }
        })
        if(DiscountOfSuppliar) throw new BadRequestException("Already used Discount")
      }
    await this.basketRepository.update({userId},{discountId:discount.id})
    return {
      message:'you add discount to basket'
    }
  }
 async removeDiscountBasket(discountDto:DiscountDto) {
    const {code}=discountDto
    const {id:userId}=this.req.user
   
    const discount=await this.discountRepository.findOneBy({code})
    if(!discount) throw new NotFoundException("discount code notFound!")
    const discountBasket=await this.basketRepository.findOne({
      where:{discountId:discount.id}
    })
    if(!discountBasket) throw new BadRequestException("your basket have not discount")
    await this.basketRepository.update({userId},{discountId:null})
    return {
      message:'you remove discount in basket'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number) {
    return `This action updates a #${id} basket`;
  }



}
