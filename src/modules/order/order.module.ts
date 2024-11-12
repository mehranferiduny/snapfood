import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { UserAdressEntity } from '../user/entity/addres.entity';
import { AuthModule } from '../auth/auth.module';
import { OtpSuppliarEntity } from '../supplier/entities/otp.entity';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierEntity } from '../supplier/entities/supplier.entity';
import { SuppliarDocumentEntity } from '../supplier/entities/document.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { S3Service } from '../s3/s3.service';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([OrderEntity,SupplierEntity,SuppliarDocumentEntity,CategoryEntity,UserAdressEntity,OtpSuppliarEntity])],
  controllers: [OrderController],
  providers: [OrderService,UserService,SupplierService,CategoryService,S3Service],
})
export class OrderModule {}
