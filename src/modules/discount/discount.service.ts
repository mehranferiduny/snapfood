import { ConflictException, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { Repository } from 'typeorm';
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
  

    let discount=await this.discountRepository.findOneBy({code})
    if(discount) throw new ConflictException("code already exist!")

      if(isBoolean(active)){
        active=toBoolean(active)
      }
      discount= this.discountRepository.create({
        code,
        expierIn,
        amount,
        limit,
        suppliarId:suppliariid,
        percent,
        active
      })

      await this.discountRepository.save(discount)

      return {
        message:"discount created saccesfully"
      }
  }

  findAll() {
    return `This action returns all discount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
