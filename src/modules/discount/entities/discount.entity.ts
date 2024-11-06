import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityName.Discount)
export class DiscountEntity extends BaseEntity {
  @Column()
  code:string;
  @Column({type:'double' , nullable:true})
  percent:number;
  @Column({type:'double' , nullable:true})
  amount:number;

  @Column({nullable:true})
  expierIn:Date

  @Column({nullable:true})
  limit:number

  @Column({nullable:true})
  usage:number

  @Column({nullable:true})
  suppliarId:number

  @Column({default:true})
  active:boolean

  @OneToMany(()=>BasketEntity,basket=>basket.discount)
  basket:BasketEntity[]

}
