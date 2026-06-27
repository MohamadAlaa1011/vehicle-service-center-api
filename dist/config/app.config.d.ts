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
export declare const getAppConfig: (configService: ConfigService) => AppConfig;
