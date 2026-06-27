import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const entityPaths = [__dirname + '/../**/*.entity{.ts,.js}'];
const migrationPaths = [__dirname + '/../database/migrations/*{.ts,.js}'];

const isRemoteDatabaseUrl = (url: string) =>
  url.includes('neon') || url.includes('railway') || url.includes('render');

const parsePostgresUrl = (databaseUrl: string) => {
  const url = new URL(databaseUrl.trim());
  return {
    host: url.hostname,
    port: parseInt(url.port || '5432', 10),
    username: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
  };
};

const baseOrmOptions = (
  configService: ConfigService,
): Pick<
  TypeOrmModuleOptions,
  'synchronize' | 'logging' | 'autoLoadEntities' | 'retryAttempts' | 'retryDelay'
> => ({
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  logging: configService.get<string>('NODE_ENV') === 'development',
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 2000,
});

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL')?.trim();

  if (databaseUrl) {
    const parsed = parsePostgresUrl(databaseUrl);
    return {
      type: 'postgres',
      host: parsed.host,
      port: parsed.port,
      username: parsed.username,
      password: parsed.password,
      database: parsed.database,
      entities: entityPaths,
      migrations: migrationPaths,
      ssl: isRemoteDatabaseUrl(databaseUrl)
        ? { rejectUnauthorized: false }
        : false,
      ...baseOrmOptions(configService),
    };
  }

  const portRaw = configService.get<string>('DB_PORT');
  const port = parseInt(portRaw || '5432', 10) || 5432;

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port,
    username: configService.get<string>('DB_USERNAME') || 'postgres',
    password: configService.get<string>('DB_PASSWORD') || 'password',
    database: configService.get<string>('DB_DATABASE') || 'vehicle_service_center',
    entities: entityPaths,
    migrations: migrationPaths,
    ssl: configService.get<string>('NODE_ENV') === 'production'
      ? { rejectUnauthorized: false }
      : false,
    ...baseOrmOptions(configService),
  };
};

// TypeORM CLI configuration (seeds, migrations)
export const typeOrmConfig: DataSourceOptions = process.env.DATABASE_URL
  ? (() => {
      const parsed = parsePostgresUrl(process.env.DATABASE_URL);
      return {
        type: 'postgres',
        host: parsed.host,
        port: parsed.port,
        username: parsed.username,
        password: parsed.password,
        database: parsed.database,
        entities: entityPaths,
        migrations: migrationPaths,
        synchronize: false,
        logging: process.env.NODE_ENV === 'development',
        ssl: isRemoteDatabaseUrl(process.env.DATABASE_URL)
          ? { rejectUnauthorized: false }
          : false,
      };
    })()
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'vehicle_service_center',
      entities: entityPaths,
      migrations: migrationPaths,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    };

export default new DataSource(typeOrmConfig);
