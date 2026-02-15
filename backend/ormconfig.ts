import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'spmi_db',
  entities: ['src/entities/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/**/*.{ts,js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
