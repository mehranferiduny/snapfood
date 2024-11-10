import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { BasketDto, DiscountDto } from "./dto/basket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketEntity } from "./entities/basket.entity";
import { IsNull, Not, Repository } from "typeorm";
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
      if(!discount.active) throw new BadRequestException("discount code is not active")
        if(discount.limit && discount.limit <= discount.usage) throw new BadRequestException("limited discount")
          if(discount.expierIn && discount.expierIn?.getTime() <= new Date().getTime()) throw new BadRequestException("expier in code discount")


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
      }else if(!discount.suppliarId){
      const discountGeneral=await this.basketRepository.findOne({
        relations:{discount:true},
        where:{
          userId,
          discount:{
            id:Not(IsNull()),
            suppliarId:IsNull()
          }
        }
      })
      if(discountGeneral) throw new BadRequestException("already exist discount!")
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

  async getBasket() {
    const {id:userId}=this.req.user
    const basketItem=await this.basketRepository.find({
      relations:{
        discount:true,
        food:{
          suppliar:true
        }
      },
      where:{userId}
    })
    const foods=basketItem.filter(item=>item.foodId)
    const suppliarDiscount=basketItem.filter(item=>item?.discount?.suppliarId)
    const generalDiscount=basketItem.find(item=>item?.discount?.id && !item?.discount?.suppliarId)
    

    let total_amount=0
    let payment_amount=0
    let total_discount_amount=0
    let foodList=[]

    for (const item of foods) {
        let discount_amount=0
        let discount_code:string=null
        const {food,count}=item
        total_amount+= food.price*count
        const suppliarId=food.suppliarId
        let foodPrice=food.price * count
        if(food.is_active_discount && food.discount > 0){
          discount_amount += foodPrice * (food.discount / 100)
          foodPrice = foodPrice - foodPrice * (food.discount / 100)

        }

        const discountItem=suppliarDiscount.find(({discount})=>discount.suppliarId === suppliarId)
        if(discountItem){
          const {discount:{active,amount,code,limit,percent,usage}}=discountItem
          if(active){
            if(!limit || (limit && limit > usage)){
              discount_code=code
              if(percent && percent > 0){
                discount_amount += foodPrice * (percent / 100)
                foodPrice= foodPrice - foodPrice * (percent / 100)
              } else if(amount && amount > 0){
                discount_amount += amount
                foodPrice = amount > foodPrice ? 0 : foodPrice - amount 
              }
            }
          }
        }

        payment_amount += foodPrice;
        total_discount_amount += discount_amount
        foodList.push({
          name:food.name,
          discription:food.description,
          image:food.image,
          discount:food.discount,
          count,
          price:food.price,
          total_amount:food.price * count,
          discount_amount,
          payment_amount:(food.price * count) - discount_amount,
          discount_code,
          suppliarId,
          suppliarName:food?.suppliar?.store_name,
          suppliarImage:food?.suppliar?.logo,
        })

       



        
    }
    let generalDiscountDitel={}
    if(generalDiscount?.discount?.active){
      const {limit,usage,code,percent,amount}=generalDiscount.discount
      if(!limit && (limit > usage)){
        let discount_amount=0
        if(percent && percent>0){
          discount_amount=payment_amount * (percent / 100)
        }else if(amount && amount>0){
          discount_amount=amount
        }
        payment_amount= discount_amount > payment_amount ? 0 : payment_amount - discount_amount
        total_discount_amount += discount_amount
        generalDiscountDitel={
          code,
          percent,
          amount,
          discount_amount,

        }
      }
    }

    return{
      total_amount,
      payment_amount,
      total_discount_amount,
      foodList,
      generalDiscountDitel
    }

  }

  update(id: number) {
    return `This action updates a #${id} basket`;
  }



}
