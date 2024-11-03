import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { OtpSuppliarEntity } from './entities/otp.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from '../s3/s3.service';
import { CategoryService } from '../category/category.service';
import { SuppliarDocumentEntity } from './entities/document.entity';


import { NextLevelDocument, NextLevelInfo } from 'src/common/middleware/next-level.middleware';


@Module({
  imports:[TypeOrmModule.forFeature([SupplierEntity,OtpSuppliarEntity,CategoryEntity,SuppliarDocumentEntity])],
  controllers: [SupplierController],
  providers: [SupplierService,JwtService,S3Service,CategoryService],
  exports:[SupplierService,JwtService,S3Service,TypeOrmModule]
})
export class SupplierModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextLevelInfo).forRoutes("/supplier/document-upload"),
    consumer.apply(NextLevelDocument).forRoutes("/supplier/contract-upload")
  }
}
