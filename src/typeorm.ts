/* istanbul ignore file */
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

const isDev = process.env.NODE_ENV === 'development';

const connectionOpts: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: isDev,
  logging: isDev,
  migrationsRun: true,
  migrations: [],
  cli: {
    migrationsDir: './src/migrations',
  },
  charset: 'utf8mb4_unicode_ci',
};

export = connectionOpts;
