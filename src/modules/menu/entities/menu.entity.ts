import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TypeMenuEvtity } from "./types.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { BaseEntity } from "src/common/abestracs/base.entity";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { FeedBackEntity } from "./feedback.entity";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";
import { OrderItemEntity } from "src/modules/order/entities/order-item.entity";

@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntity{

@Column()
name:string
@Column()
description:string
@Column()
image:string
@Column()
imageKey:string
@Column({type:'double'})
price:number
@Column({type:'double',default:0})
discount:number
@Column({default:false})
is_active_discount:boolean
@Column({type:'double',nullable:true})
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

  @OneToMany(()=>BasketEntity,basket=>basket.food)
  basket:BasketEntity[]

  @OneToMany(()=>OrderItemEntity,item=>item.food)
  items:OrderItemEntity[]
}
