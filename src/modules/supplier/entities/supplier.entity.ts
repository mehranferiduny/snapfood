import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OtpSuppliarEntity } from "./otp.entity";
import { statusSuppliar } from "../enum/status.enum";

@Entity(EntityName.Supplier)
export class SupplierEntity extends BaseEntity {
  @Column()
  mangaer_name:string
  @Column()
  mangaer_family:string
  @Column()
  phone:string

  @Column()
  store_name:string

  @Column()
  city:string
  @Column({default:false})
  verifay_mobail:boolean

  @Column({nullable:true})
  email:string

  @Column({nullable:true})
  national_code:string

  @Column({nullable:true,default:statusSuppliar.Registerd})
  status:string


  @Column()
  categooryId:number


  @ManyToOne(()=>CategoryEntity,categoory=>categoory.suppliar,{onDelete:'SET NULL'})
  categoory:CategoryEntity


  @Column()
  invait_code:string

  @Column({nullable:true})
   agentId:number

   @ManyToOne(()=>SupplierEntity,supplier=>supplier.sebsets)
   agent:SupplierEntity

   @OneToMany(()=>SupplierEntity,suppliar=>suppliar.agent)
   sebsets:SupplierEntity[]


   
   @Column({nullable:true})
   otpId:number
   @OneToOne(()=>OtpSuppliarEntity,(otp)=>otp.suppliar)
   @JoinColumn({name:"otpId"})
   otp:OtpSuppliarEntity


}
