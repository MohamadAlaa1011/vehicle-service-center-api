"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const core_2 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_2.Reflector)), new logging_interceptor_1.LoggingInterceptor());
    app.use(['/api/docs', '/api/docs-json'], (_req, res, next) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
    });
    const publicUrl = configService.get('APP_URL') ||
        configService.get('PUBLIC_URL') ||
        configService.get('TUNNEL_URL');
    const port = configService.get('PORT', 3000);
    const isRemoteDeploy = !!process.env.DATABASE_URL;
    const swaggerBuilder = new swagger_1.DocumentBuilder()
        .setTitle('Vehicle Service Center Management System API')
        .setDescription('Complete API documentation for Vehicle Service Center Management System')
        .setVersion('1.0.1')
        .addBearerAuth();
    if (publicUrl) {
        swaggerBuilder.addServer(publicUrl.replace(/\/$/, ''), 'Production');
    }
    else if (isRemoteDeploy) {
        swaggerBuilder.addServer('/', 'Current Host');
    }
    else {
        swaggerBuilder.addServer(`http://localhost:${port}`, 'Local Development');
    }
    swaggerBuilder
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Users', 'User management operations')
        .addTag('Customers', 'Customer management operations')
        .addTag('Vehicles', 'Vehicle management operations')
        .addTag('Mechanics', 'Mechanic management operations')
        .addTag('Suppliers', 'Supplier management operations')
        .addTag('Spare Parts', 'Spare parts inventory management')
        .addTag('Appointments', 'Appointment scheduling operations')
        .addTag('Service Orders', 'Service order management operations')
        .addTag('Inventory Transactions', 'Inventory tracking operations')
        .addTag('Invoices', 'Invoice management operations')
        .addTag('Payments', 'Payment processing operations')
        .addTag('Reports', 'Business reports and analytics')
        .addTag('Dashboard', 'Dashboard statistics');
    const config = swaggerBuilder.build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Vehicle Service Center API',
        customfavIcon: '/favicon.ico',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        ],
    });
    app.getHttpAdapter().get('/', (req, res) => {
        res.redirect('/api/docs');
    });
    app.getHttpAdapter().get('/health', (req, res) => {
        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
    });
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Vehicle Service Center API is running on: ${await app.getUrl()}`);
    console.log(`📚 Swagger documentation available at: ${await app.getUrl()}/api/docs`);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map