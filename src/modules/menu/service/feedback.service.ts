import { Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedBackEntity } from "../entities/feedback.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { FeedbackDto } from "../dto/menu.dto";


@Injectable({scope:Scope.REQUEST})
export class FeedbackService {
     constructor(
      @InjectRepository(FeedBackEntity) private readonly feedBackRepository:Repository<FeedBackEntity>,
      @Inject(REQUEST) private readonly req:Request
     ){}

    async createFeedBack(feedDto:FeedbackDto,id:number){
      const {id:userId}=this.req.user
      const {comment,score} = feedDto
 
      const feedback= this.feedBackRepository.create({
        comment,
        foodId:id,
        score,
        userId
      })

      await this.feedBackRepository.save(feedback)
      return{
        message:"feedback create sucsesfully"
      }
        
     }
}
