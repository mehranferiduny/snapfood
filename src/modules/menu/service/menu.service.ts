import { BadGatewayException, BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { MenuEntity } from "../entities/menu.entity";
import { Repository } from "typeorm";
import { S3Service } from "src/modules/s3/s3.service";
import { TypeMenuService } from "./type.service";
import { MenuDto } from "../dto/menu.dto";
import { SupplierService } from "src/modules/supplier/supplier.service";
import { statusSuppliar } from "src/modules/supplier/enum/status.enum";
import { TypeMenuEvtity } from "../entities/types.entity";



@Injectable({scope:Scope.REQUEST})
export class MenuService {
  constructor(
    @Inject(REQUEST) private readonly req:Request,
    @InjectRepository(MenuEntity) private readonly menuRepostory:Repository<MenuEntity>,
    @InjectRepository(TypeMenuEvtity) private readonly typeMenuRepostory:Repository<TypeMenuEvtity>,
    private readonly s3Servis:S3Service,
    private readonly typeServis:TypeMenuService,
    private readonly supliarServis:SupplierService,
  ){}

  async createItemMenu(menuDto:MenuDto,image:Express.Multer.File){
    const {id:suppliarId}=this.req.suppliar
   await this.supliarServis.ststusSupliar(suppliarId)
    const{description,discount,name,price,foodTypeId}=menuDto
    if(price < 1 && price > 100000000) throw new BadGatewayException("price invalid")
    if(discount < 1 && discount > 100000000) throw new BadGatewayException("discount invalid")
    const imageResalt=await this.s3Servis.uploadFile(image,"image-menu")
    const menu= this.menuRepostory.create({
      description,
      discount,
      image:imageResalt.Location,
      name,
      price,
      suppliarId,
      foodTypeId,
      imageKey:imageResalt.Key,

    })

    await this.menuRepostory.save(menu)
    return {
      message:"menu item create sucsesfully"
    }


  }

  async findAll(slug:string){
    const supliar=await this.supliarServis.findSlugSupliar(slug)
    return await this.typeMenuRepostory.find({
      where:{suppliarId:supliar.id},
      order:{priority:'ASC'},
      relations:{
        menu:true
      }
    })
  }

}
