import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { UserAdressEntity } from "./addres.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity{
   @Column({nullable:true})
   first_name:string
   @Column({nullable:true})
   last_name:string

   @Column({unique:true})
   phone:string

   @Column({unique:true,nullable:true})
   email:string

   @Column({unique:true})
   invait_code:true

   @Column({default:0})
   scoer:number

   @Column({nullable:true})
   agentId:number


   @OneToMany(()=>UserAdressEntity,(address)=>address.user)
   addressList:UserAdressEntity[]
}