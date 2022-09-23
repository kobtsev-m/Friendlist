import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configApp } from './app.setup';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configApp(app);
  await app.listen(process.env.PORT);
  console.log(`App started on port ${process.env.PORT}`);
};

bootstrap();
