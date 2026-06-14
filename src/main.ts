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

  // Swagger documentation (enabled in all environments)
  const config = new DocumentBuilder()
    .setTitle('Vehicle Service Center Management System API')
    .setDescription('Complete API documentation for Vehicle Service Center Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local Development')
    .addServer(
      configService.get('TUNNEL_URL') || 'https://your-tunnel-domain.trycloudflare.com',
      'Cloudflare Tunnel (Public)'
    )
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
    .addTag('Dashboard', 'Dashboard statistics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
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

  // Health check
  app.getHttpAdapter().get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`🚀 Vehicle Service Center API is running on: ${await app.getUrl()}`);
  console.log(`📚 Swagger documentation available at: ${await app.getUrl()}/api/docs`);
}

bootstrap().catch(console.error);
