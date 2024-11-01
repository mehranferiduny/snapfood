import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { SupplierEntity } from "./supplier.entity";


@Entity(EntityName.SupplierDocument)
export class SuppliarDocumentEntity extends BaseEntity{
  @Column()
  acsseptDoc:string
  @Column()
  image:string
  @Column()
  acsseptDocKey:string
  @Column()
  imageKey:string

  @Column({nullable:true})
  supplerId:number
  @OneToOne(()=>SupplierEntity,supliar=>supliar.document)
  @JoinColumn({name:'supplerId'})
  supliar:SupplierEntity
}