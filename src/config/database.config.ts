import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  // Handle Render's DATABASE_URL format
  const databaseUrl = configService.get<string>('DATABASE_URL');
  
  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: configService.get<string>('NODE_ENV') === 'development',
      logging: configService.get<string>('NODE_ENV') === 'development',
      autoLoadEntities: true,
      ssl:
        databaseUrl.includes('neon') ||
        databaseUrl.includes('railway') ||
        databaseUrl.includes('render') ||
        configService.get<string>('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
    };
  }

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: configService.get<string>('NODE_ENV') === 'development',
    logging: configService.get<string>('NODE_ENV') === 'development',
    autoLoadEntities: true,
    ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  };
};

const isRemoteDatabaseUrl = (url: string) =>
  url.includes('neon') || url.includes('railway') || url.includes('render');

// TypeORM CLI configuration (seeds, migrations)
export const typeOrmConfig: DataSourceOptions = process.env.DATABASE_URL
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      ssl: isRemoteDatabaseUrl(process.env.DATABASE_URL)
        ? { rejectUnauthorized: false }
        : false,
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432') || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'vehicle_service_center',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    };

export default new DataSource(typeOrmConfig);