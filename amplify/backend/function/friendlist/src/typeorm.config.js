const dotenv = require('dotenv');
const path = require('path');
const { DataSource } = require('typeorm');

dotenv.config();

const typeOrmConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  entities: [path.join('dist', '**', '*.entity.js')],
  migrations: [path.join('dist', 'migrations', '*.js')],
  migrationsTableName: 'migrations',
  synchronize: false
};

exports.default = new DataSource(typeOrmConfig);
