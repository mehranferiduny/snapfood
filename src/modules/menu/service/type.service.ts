import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { TypeMenuDto } from "../dto/menu.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeMenuEvtity } from "../entities/types.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";


@Injectable({scope:Scope.REQUEST})
export class MenuService {
  constructor(
    @InjectRepository(TypeMenuEvtity) private readonly typeRepository:Repository<TypeMenuEvtity>,
    @Inject(REQUEST) private readonly req:Request
  ){}
 async create(typeDto: TypeMenuDto) {
    const {title}=typeDto
     const {id:suppliarId}=this.req.suppliar
    const type= this.typeRepository.create({suppliarId,title})
    await this.typeRepository.save(type)
       
  }

  async findAll() {
    return this.typeRepository.findAndCount({
      where:{},
      order:{id:'DESC'}
    });
  }

 async findOne(id: number) {
    const type=await this.typeRepository.findOneBy({id})
    if(!type) throw new NotFoundException("Type Menu NotFund!")
    return type
  }



  async remove(id: number) {
    await this.findOne(id)
    await this.typeRepository.delete({id})
    return {
      message:"delete type menu sucsesfully"
    }
  }
}
