import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { DiscountEntity } from "src/modules/discount/entities/discount.entity";
import { MenuEntity } from "src/modules/menu/entities/menu.entity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { TypeBasket } from "../enum/type-basket.enum";

@Entity(EntityName.Basket)
export class BasketEntity extends BaseEntity {


  @Column()
  userId:number

  @Column()
  foodId:number

  @Column()
  count:number


  @Column({nullable:true})
  discountId:number

  @Column({nullable:true, enum:TypeBasket,type:'enum'})
  type:string

  @ManyToOne(()=>UserEntity,user=>user.baskets,{onDelete:"CASCADE"})
  user:UserEntity

  @ManyToOne(()=>MenuEntity,menu=>menu.basket,{onDelete:"CASCADE"})
  food:MenuEntity

  @ManyToOne(()=>DiscountEntity,discount=>discount.basket,{onDelete:"CASCADE"})
  discount:DiscountEntity

}
