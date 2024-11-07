import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MenuModule } from '../menu/menu.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from './entities/basket.entity';
import { DiscountEntity } from '../discount/entities/discount.entity';

@Module({
  imports:[MenuModule,AuthModule,TypeOrmModule.forFeature([BasketEntity,DiscountEntity])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
