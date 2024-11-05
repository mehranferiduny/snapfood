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
import { FeedbackController } from "./controller/feedback.controller";
import { FeedbackService } from "./service/feedback.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports:[SupplierModule,AuthModule,TypeOrmModule.forFeature([TypeMenuEvtity,MenuEntity,FeedBackEntity])],
  controllers: [MenuController,TypeMenuController,FeedbackController],
  providers: [MenuService,TypeMenuService,FeedbackService],
})
export class MenuModule {}
