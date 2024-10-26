import { BaseEntity } from "src/common/abestracs/base.entity";
import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title:string
  @Column({unique:true})
  slug:string
  @Column()
  image:string
  @Column()
  show:boolean

  @Column({nullable:true})
  parentId:number

  @ManyToOne(()=>CategoryEntity,(catgory)=>catgory.childern,{onDelete:"CASCADE"})
  parent:CategoryEntity
  @OneToMany(()=>CategoryEntity,(category)=> category.parent)
  childern:CategoryEntity[]
}
