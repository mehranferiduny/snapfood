import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { OrderItemStatus } from "../enum/statusOrder.enum";
import { MenuEntity } from "src/modules/menu/entities/menu.entity";
import { OrderEntity } from "./order.entity";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";

@Entity(EntityName.OredrItem)
export class OrderItemEntity extends BaseEntity{

  @Column()
  foodId:number
  @Column()
  orderId:number
  @Column()
  suppliarId:number

  @Column({type:'enum',enum:OrderItemStatus,default:OrderItemStatus.Pending})
  status:string
  @Column()
  count:number

    @ManyToOne(()=>MenuEntity,menu=>menu.items,{onDelete:"CASCADE"})
    food:MenuEntity

    @ManyToOne(()=>OrderEntity,order=>order.items,{onDelete:"CASCADE"})
    order:OrderEntity

    @ManyToOne(()=>SupplierEntity,suppliar=>suppliar.items,{onDelete:"CASCADE"})
    suppliar:SupplierEntity

}