import { BadGatewayException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { MenuEntity } from "../entities/menu.entity";
import { Repository } from "typeorm";
import { S3Service } from "src/modules/s3/s3.service";
import { TypeMenuService } from "./type.service";
import { MenuDto } from "../dto/menu.dto";



@Injectable({scope:Scope.REQUEST})
export class MenuService {
  constructor(
    @Inject(REQUEST) private readonly req:Request,
    @InjectRepository(MenuEntity) private readonly menuRepostory:Repository<MenuEntity>,
    private readonly s3Servis:S3Service,
    private readonly typeServis:TypeMenuService
  ){}

  async createItemMenu(menuDto:MenuDto,image:Express.Multer.File){
    const {id:suppliarId}=this.req.suppliar
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
      imageKey:imageResalt.Key

    })

    await this.menuRepostory.save(menu)
    return {
      message:"menu item create sucsesfully"
    }


  }

}
