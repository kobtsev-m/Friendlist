import { NestExpressApplication } from '@nestjs/platform-express';

export const configApp = (app: NestExpressApplication): NestExpressApplication => {
  app.enableCors();
  return app;
};
