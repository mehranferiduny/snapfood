import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity(EntityName.UserAdress)
export class UserAdressEntity extends BaseEntity{
  @Column()
  title:string
  @Column()
  province:string
  @Column()
  city:string
  @Column()
  address:string
  @Column({nullable:true})
  postal_code:string

  @Column()
  userId:number

  @ManyToOne(()=>UserEntity,(user)=>user.addressList,{onDelete:'CASCADE'})
  user:UserEntity
}