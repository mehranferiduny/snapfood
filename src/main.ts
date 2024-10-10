import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { swagerConfigInit } from './config/swagger.config';

import { join } from 'path';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config({path:join(process.cwd(),".env")})
  swagerConfigInit(app)
  const {PORT}=process.env 
  await app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
