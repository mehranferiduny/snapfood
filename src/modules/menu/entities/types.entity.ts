import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuEntity } from "./menu.entity";

@Entity(EntityName.TypeMenu)
export class TypeMenuEvtity extends BaseEntity{
   @Column()
   title:string

   @Column({default:1})
   priority:number

   
   @Column()
   suppliarId:number
   @ManyToOne(()=>SupplierEntity,supliar=>supliar.menuType,{onDelete:'CASCADE'})
   suppliar:SupplierEntity


   @OneToMany(()=>MenuEntity,menu=>menu.foodType,{onDelete:'CASCADE'})
   menu:MenuEntity[]
}