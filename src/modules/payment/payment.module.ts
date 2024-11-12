import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { BasketService } from '../basket/basket.service';
import { AuthModule } from '../auth/auth.module';
import { BasketEntity } from '../basket/entities/basket.entity';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { MenuService } from '../menu/service/menu.service';
import { MenuEntity } from '../menu/entities/menu.entity';
import { TypeMenuEvtity } from '../menu/entities/types.entity';
import { S3Service } from '../s3/s3.service';
import { TypeMenuService } from '../menu/service/type.service';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierEntity } from '../supplier/entities/supplier.entity';
import { OtpSuppliarEntity } from '../supplier/entities/otp.entity';
import { SuppliarDocumentEntity } from '../supplier/entities/document.entity';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([MenuEntity,TypeMenuEvtity,PaymentEntity,BasketEntity,SupplierEntity,CategoryEntity,OtpSuppliarEntity,SuppliarDocumentEntity,DiscountEntity])],
  controllers: [PaymentController],
  providers: [PaymentService,MenuService,BasketService,S3Service,TypeMenuService,SupplierService,CategoryService],
})
export class PaymentModule {}
