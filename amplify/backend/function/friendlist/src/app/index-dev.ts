import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configApp } from './app.setup';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  const appOptions: NestApplicationOptions = { logger: ['error', 'warn'] };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  configApp(app);
  await app.listen(process.env.PORT);
  console.log(`App started: http://localhost:${process.env.PORT}/graphql`);
};

bootstrap();
