"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = exports.getDatabaseConfig = void 0;
const typeorm_1 = require("typeorm");
const entityPaths = [__dirname + '/../**/*.entity{.ts,.js}'];
const migrationPaths = [__dirname + '/../database/migrations/*{.ts,.js}'];
const isRemoteDatabaseUrl = (url) => url.includes('neon') || url.includes('railway') || url.includes('render');
const parsePostgresUrl = (databaseUrl) => {
    const url = new URL(databaseUrl.trim());
    return {
        host: url.hostname,
        port: parseInt(url.port || '5432', 10),
        username: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, ''),
    };
};
const baseOrmOptions = (configService) => ({
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    autoLoadEntities: true,
    retryAttempts: 3,
    retryDelay: 2000,
});
const getDatabaseConfig = (configService) => {
    const databaseUrl = configService.get('DATABASE_URL')?.trim();
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
    const portRaw = configService.get('DB_PORT');
    const port = parseInt(portRaw || '5432', 10) || 5432;
    return {
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port,
        username: configService.get('DB_USERNAME') || 'postgres',
        password: configService.get('DB_PASSWORD') || 'password',
        database: configService.get('DB_DATABASE') || 'vehicle_service_center',
        entities: entityPaths,
        migrations: migrationPaths,
        ssl: configService.get('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
        ...baseOrmOptions(configService),
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
exports.typeOrmConfig = process.env.DATABASE_URL
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
exports.default = new typeorm_1.DataSource(exports.typeOrmConfig);
//# sourceMappingURL=database.config.js.map