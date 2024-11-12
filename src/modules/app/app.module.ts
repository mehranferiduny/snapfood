import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MenuModule } from '../menu/menu.module';
import { UserModule } from '../user/user.module';
import { DiscountModule } from '../discount/discount.module';
import { BasketModule } from '../basket/basket.module';
import { PaymentModule } from '../payment/payment.module';
import { HttpApiModules } from '../http/http.module';
import { HttpModule } from '@nestjs/axios';
import { OrderModule } from '../order/order.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    CategoryModule,
    SupplierModule,
    MenuModule,
    UserModule,
    DiscountModule,
    BasketModule,
    PaymentModule,
    HttpApiModules,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
