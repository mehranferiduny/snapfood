import { BaseEntity } from "src/common/abestracs/base.entity";

import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityName } from "src/common/enum/entity-name.enum";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity{
   @Column()
   code:string
   @Column({nullable:true})
   mehtoad:string
   @Column()
   expiresIn:Date
   @Column()
   userId:number
   @OneToOne(()=>UserEntity,(user)=>user.otp,{onDelete:"CASCADE"})
   user:UserEntity
   
   
}