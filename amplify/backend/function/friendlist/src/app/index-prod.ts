import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { configApp } from './app.setup';
import { AppModule } from './app.module';

let cachedServer: Server;

const bootstrap = async () => {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp)
  );
  configApp(app);
  await app.init();
  return expressApp;
};

exports.handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await createServer(await bootstrap());
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
