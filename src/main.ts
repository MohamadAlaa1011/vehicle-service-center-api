import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );

  // Rate limiting is handled by ThrottlerModule in app.module.ts

  // Prevent browsers/CDN from caching stale Swagger assets (Cloudflare was caching init.js)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/reference') || req.path.startsWith('/api/docs')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('CDN-Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    next();
  });

  // Swagger documentation (enabled in all environments)
  const publicUrl =
    configService.get<string>('APP_URL') ||
    configService.get<string>('PUBLIC_URL') ||
    configService.get<string>('TUNNEL_URL');

  const port = configService.get<number>('PORT', 3000);
  const isRemoteDeploy = !!process.env.DATABASE_URL;

  const swaggerBuilder = new DocumentBuilder()
    .setTitle('Vehicle Service Center Management System API')
    .setDescription('Complete API documentation for Vehicle Service Center Management System')
    .setVersion('1.0.2')
    .addBearerAuth();

  if (publicUrl) {
    swaggerBuilder.addServer(publicUrl.replace(/\/$/, ''), 'Production');
  } else if (isRemoteDeploy) {
    // Use same host as Swagger page (works on Bonto without APP_URL)
    swaggerBuilder.addServer('/', 'Current Host');
  } else {
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/reference', app, document, {
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

  const httpAdapter = app.getHttpAdapter();

  // Old /api/docs URL is cached by Cloudflare — redirect to fresh Swagger path
  httpAdapter.get('/api/docs', (_req, res) => {
    res.redirect(302, '/api/reference');
  });

  // Redirect root to Swagger docs
  httpAdapter.get('/', (_req, res) => {
    res.redirect('/api/reference');
  });

  // Health check
  httpAdapter.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Vehicle Service Center API is running on: ${await app.getUrl()}`);
  console.log(`📚 Swagger documentation available at: ${await app.getUrl()}/api/reference`);
}

bootstrap().catch(console.error);
