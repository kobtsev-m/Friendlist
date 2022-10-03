import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  cli: { migrationsDir: path.join(__dirname, '..', 'migrations') },
  migrationsTableName: 'migrations',
  synchronize: false,
  keepConnectionAlive: true
};

export = typeOrmConfig;
