import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MenuModule } from '../menu/menu.module';
import { UserModule } from '../user/user.module';
import { DiscountModule } from '../discount/discount.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    CategoryModule,
    SupplierModule,
    MenuModule,
    UserModule,
    DiscountModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
