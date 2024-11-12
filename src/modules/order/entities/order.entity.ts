import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OrderStatus } from "../enum/statusOrder.enum";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { UserAdressEntity } from "src/modules/user/entity/addres.entity";
import { OrderItemEntity } from "./order-item.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
@Entity(EntityName.Order)
export class OrderEntity extends BaseEntity {

  @Column()
  userId:number
  @Column({nullable:true})
  addresId:number

  @Column()
  payment_amount:number
  @Column()
  discount_amount:number
  @Column()
  total_amount:number

  @Column({type:'enum',enum:OrderStatus,default:OrderStatus.Pending})
  status:string
  @Column({nullable:true})
  discription:string

  @ManyToOne(()=>UserEntity,user=>user.orders,{onDelete:"CASCADE"})
  user:UserEntity
  @ManyToOne(()=>UserAdressEntity,addres=>addres.orders,{onDelete:"SET NULL"})
  addres:UserAdressEntity

    @OneToMany(()=>OrderItemEntity,item=>item.order)
    items:OrderItemEntity[]

    @OneToOne(()=>PaymentEntity,payment=>payment.order)
    payment:PaymentEntity





}
