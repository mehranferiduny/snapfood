import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TypeMenuEvtity } from "./types.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { BaseEntity } from "src/common/abestracs/base.entity";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { FeedBackEntity } from "./feedback.entity";

@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntity{

@Column()
name:string
@Column()
description:string
@Column()
image:string
@Column({type:'double'})
price:number
@Column({type:'double',default:0})
discount:number
@Column({type:'double'})
score:number


  @Column()
  suppliarId:number
  @ManyToOne(()=>SupplierEntity,suppliar=>suppliar.menu)
  suppliar:SupplierEntity

  @Column()
  foodTypeId:number
  @ManyToOne(()=>TypeMenuEvtity,type=>type.menu)
  foodType:TypeMenuEvtity

  @OneToMany(()=>FeedBackEntity,feed=>feed.food)
  feedback:FeedBackEntity[]
}
