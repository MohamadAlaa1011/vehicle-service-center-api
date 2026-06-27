"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConfig = void 0;
const getAppConfig = (configService) => ({
    port: configService.get('PORT') || 3000,
    nodeEnv: configService.get('NODE_ENV') || 'development',
    jwt: {
        secret: configService.get('JWT_SECRET') || 'fallback-secret',
        expiresIn: configService.get('JWT_EXPIRES_IN') || '24h',
        refreshSecret: configService.get('JWT_REFRESH_SECRET') || 'fallback-refresh-secret',
        refreshExpiresIn: configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    },
    rateLimit: {
        ttl: configService.get('RATE_LIMIT_TTL') || 60,
        limit: configService.get('RATE_LIMIT_LIMIT') || 100,
    },
    pagination: {
        defaultPageSize: configService.get('DEFAULT_PAGE_SIZE') || 20,
        maxPageSize: configService.get('MAX_PAGE_SIZE') || 100,
    },
});
exports.getAppConfig = getAppConfig;
//# sourceMappingURL=app.config.js.map