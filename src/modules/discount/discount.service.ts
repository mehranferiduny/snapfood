import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { DeepPartial, Repository } from 'typeorm';
import { isBoolean, toBoolean } from 'src/common/utils/function.utils';

@Injectable({scope:Scope.REQUEST})
export class DiscountService {
  constructor(
    @Inject(REQUEST) private readonly req:Request,
    @InjectRepository(DiscountEntity) private readonly discountRepository:Repository<DiscountEntity>
  ){}
  async create(createDiscountDto: CreateDiscountDto) {
    let {active,amount,code,expierIn,limit,percent}=createDiscountDto
    let suppliariid=null
    if(this.req.suppliar){
        suppliariid=this.req.suppliar.id
    }
  
    const discountCheck=await this.discountRepository.findOneBy({code})
    if(discountCheck) throw new ConflictException("code already exist!")
      const DiscountObject:DeepPartial<DiscountEntity>={code}

      if(isBoolean(active)){
        active=toBoolean(active)
      }
      DiscountObject['active']=active
      if((amount && percent) || (!amount && !percent)){
        throw new BadRequestException("you have sent input amount or percent!")
      }
      if(amount){
        DiscountObject['amount']=amount
      }else if(percent){
        DiscountObject['percent']=percent
      }

      if(expierIn && !isNaN(parseInt(expierIn.toString()))){
        const time=1000 * 60 * 60 * 24 * expierIn
        DiscountObject['expierIn']=new Date(new Date().getTime()+time)
      }
      if(limit && !isNaN(parseInt(limit.toString()))){
        DiscountObject['limit']=limit
      }

        const discount=this.discountRepository.create(DiscountObject)
        await this.discountRepository.save(discount)
  
      return {
        message:"discount created saccesfully"
      }
  }

  async findAll() {
    return await this.discountRepository.find({});
  }


 async remove(id: number) {
    const discount=await this.discountRepository.findOneBy({id})
    if(!discount) throw new NotFoundException("discount is notfound!")

      await this.discountRepository.delete({id})
    return {
      message:"discount remove suacsesfully"
    };
  }
}
