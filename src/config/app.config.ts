import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  port: number;
  nodeEnv: string;
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  rateLimit: {
    ttl: number;
    limit: number;
  };
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };
}

export const getAppConfig = (configService: ConfigService): AppConfig => ({
  port: configService.get<number>('PORT') || 3000,
  nodeEnv: configService.get<string>('NODE_ENV') || 'development',
  jwt: {
    secret: configService.get<string>('JWT_SECRET') || 'fallback-secret',
    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '24h',
    refreshSecret: configService.get<string>('JWT_REFRESH_SECRET') || 'fallback-refresh-secret',
    refreshExpiresIn: configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
  },
  rateLimit: {
    ttl: configService.get<number>('RATE_LIMIT_TTL') || 60,
    limit: configService.get<number>('RATE_LIMIT_LIMIT') || 100,
  },
  pagination: {
    defaultPageSize: configService.get<number>('DEFAULT_PAGE_SIZE') || 20,
    maxPageSize: configService.get<number>('MAX_PAGE_SIZE') || 100,
  },
});