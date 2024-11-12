import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityName.Payment)
export class PaymentEntity extends BaseEntity {
  

  @Column({default:false})
  status:boolean

  @Column()
  amount:number
  @Column()
  invoice_number:string
  @Column({nullable:true})
  authority:string

  @Column()
  userId:number
  @Column()
  orderId:number

    @ManyToOne(()=>UserEntity,user=>user.payment,{onDelete:"CASCADE"})
    user:UserEntity

    @ManyToOne(()=>OrderEntity,order=>order.payment,{onDelete:"CASCADE"})
    order:OrderEntity
}
