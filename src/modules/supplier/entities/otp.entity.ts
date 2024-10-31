import { BaseEntity } from "src/common/abestracs/base.entity";

import { Column, Entity, OneToOne } from "typeorm";

import { EntityName } from "src/common/enum/entity-name.enum";
import { SupplierEntity } from "./supplier.entity";

@Entity(EntityName.SupplierOtp)
export class OtpSuppliarEntity extends BaseEntity{
   @Column()
   code:string
   @Column({nullable:true})
   mehtoad:string
   @Column()
   expiresIn:Date
   @Column()
   suppliarId:number
   @OneToOne(()=>SupplierEntity,(suppliar)=>suppliar.otp,{onDelete:"CASCADE"})
   suppliar:SupplierEntity
   
   
}