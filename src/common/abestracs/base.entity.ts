import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity{
  @PrimaryGeneratedColumn("increment")
  id:number

  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  update_at:Date
}