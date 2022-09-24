import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  migrationsTableName: 'migrations',
  synchronize: false,
  keepConnectionAlive: true
};

export = typeOrmConfig;
