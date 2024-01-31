import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config';
import { config } from 'dotenv';

config({ path: '.env' });
const database = new TypeOrmConfigService();

export const dataConfigMigrations = new DataSource(
  database.createTypeOrmOptions() as DataSourceOptions,
);