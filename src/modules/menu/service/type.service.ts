import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { TypeMenuDto } from "../dto/menu.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeMenuEvtity } from "../entities/types.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";


@Injectable({scope:Scope.REQUEST})
export class TypeMenuService {
  constructor(
    @InjectRepository(TypeMenuEvtity) private readonly typeRepository:Repository<TypeMenuEvtity>,
    @Inject(REQUEST) private readonly req:Request
  ){}
 async create(typeDto: TypeMenuDto) {
    const {title}=typeDto
     const {id:suppliarId}=this.req.suppliar
    const type= this.typeRepository.create({suppliarId,title})
    await this.typeRepository.save(type)
    return {
      message:"type menu created susessfully"
    }
       
  }

  async findAll() {
    const {id:suppliarId}=this.req.suppliar
    return this.typeRepository.findAndCount({
      where:{suppliarId},
      order:{id:'DESC'}
    });
  }

 async findOne(id: number) {
  const {id:suppliarId}=this.req.suppliar
    const type=await this.typeRepository.findOneBy({id,suppliarId})
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
  async update(id: number,typeDto:TypeMenuDto) {
     const {title}=typeDto
    let type=await this.findOne(id)
    if(type) type.title=title

    await this.typeRepository.save(type)
   
    return {
      message:"update type menu sucsesfully"
    }
  }
}
