import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OtpSuppliarEntity } from "./otp.entity";
import { PickSupliar, statusSuppliar } from "../enum/status.enum";
import { SuppliarDocumentEntity } from "./document.entity";

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
  
  @Column({nullable:true})
  contract:string

  @Column({nullable:true,default:statusSuppliar.Registerd})
  status:string


  @Column({nullable:true})
  image_back:string

  @Column({nullable:true})
  logo:string

  @Column({nullable:true})
  discription:string

  @Column({nullable:true,default:0})
  score:number

  @Column({nullable:true,default:PickSupliar.PickMotory})
  pick:string




  @Column({nullable:true})
  categooryId:number


  @ManyToOne(()=>CategoryEntity,categoory=>categoory.suppliar,{onDelete:'SET NULL'})
  categoory:CategoryEntity


  @Column({nullable:true})
  invait_code:string

  @Column({nullable:true})
   agentId:number

   @ManyToOne(()=>SupplierEntity,supplier=>supplier.sebsets)
   agent:SupplierEntity

   @OneToMany(()=>SupplierEntity,suppliar=>suppliar.agent)
   sebsets:SupplierEntity[]


   @OneToOne(()=>SuppliarDocumentEntity,document=>document.supliar,{onDelete:"CASCADE"})
   document:SuppliarDocumentEntity


   
   @Column({nullable:true})
   otpId:number
   @OneToOne(()=>OtpSuppliarEntity,(otp)=>otp.suppliar)
   @JoinColumn({name:"otpId"})
   otp:OtpSuppliarEntity


}
