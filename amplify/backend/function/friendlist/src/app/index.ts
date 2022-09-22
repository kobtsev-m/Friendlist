import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { config } from 'aws-sdk';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

let cachedServer: Server;

const index = async () => {
  if (cachedServer) {
    return;
  }

  const expressApp = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  nestApp.use(eventContext());

  config.update({ region: process.env.REGION });

  await nestApp
    .listen(process.env.PORT)
    .then(() => console.log(`App started on port ${process.env.PORT}`));

  cachedServer = createServer(expressApp);
};

index();

exports.handler = async (event, context) => {
  await index();
  return await proxy(cachedServer, event, context, 'PROMISE').promise;
};
