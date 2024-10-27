import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { CategoryModule } from '../category/category.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
