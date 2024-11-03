import { Module } from "@nestjs/common";

import { MenuController } from "./controller/menu.controller";
import { MenuService } from "./service/menu.service";
import { TypeMenuService } from "./service/type.service";
import { TypeMenuController } from "./controller/typemenu.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeMenuEvtity } from "./entities/types.entity";
import { MenuEntity } from "./entities/menu.entity";
import { FeedBackEntity } from "./entities/feedback.entity";
import { SupplierService } from "../supplier/supplier.service";
import { SupplierModule } from "../supplier/supplier.module";

@Module({
  imports:[SupplierModule,TypeOrmModule.forFeature([TypeMenuEvtity,MenuEntity,FeedBackEntity])],
  controllers: [MenuController,TypeMenuController],
  providers: [MenuService,TypeMenuService],
})
export class MenuModule {}
