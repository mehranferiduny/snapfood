import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { MenuEntity } from "./menu.entity";


@Entity(EntityName.FeedBack)
export class FeedBackEntity extends BaseEntity{
  @Column()
  userId:number

  @Column()
  foodId:number

  @Column({type:"double"})
  score:number

  @Column()
  comment:string


  @ManyToOne(()=>UserEntity,user=>user.feedback,{onDelete:"CASCADE"})
  user:UserEntity
  @ManyToOne(()=>MenuEntity,menu=>menu.feedback,{onDelete:"CASCADE"})
  food:MenuEntity
}