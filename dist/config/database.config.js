"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = exports.getDatabaseConfig = void 0;
const typeorm_1 = require("typeorm");
const getDatabaseConfig = (configService) => {
    const databaseUrl = configService.get('DATABASE_URL');
    if (databaseUrl) {
        return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') === 'development',
            logging: configService.get('NODE_ENV') === 'development',
            autoLoadEntities: true,
            retryAttempts: 3,
            retryDelay: 2000,
            ssl: isRemoteDatabaseUrl(databaseUrl)
                ? { rejectUnauthorized: false }
                : false,
        };
    }
    return {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
        retryAttempts: 3,
        retryDelay: 2000,
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
const isRemoteDatabaseUrl = (url) => url.includes('neon') || url.includes('railway') || url.includes('render');
exports.typeOrmConfig = process.env.DATABASE_URL
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
exports.default = new typeorm_1.DataSource(exports.typeOrmConfig);
//# sourceMappingURL=database.config.js.map