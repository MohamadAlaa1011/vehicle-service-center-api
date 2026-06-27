import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
export declare const getDatabaseConfig: (configService: ConfigService) => TypeOrmModuleOptions;
export declare const typeOrmConfig: DataSourceOptions;
declare const _default: DataSource;
export default _default;
