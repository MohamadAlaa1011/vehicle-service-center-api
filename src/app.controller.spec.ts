import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getAppInfo', () => {
    it('should return application information', () => {
      const result = appController.getAppInfo();

      expect(result).toEqual(
        expect.objectContaining({
          name: 'Vehicle Service Center Management System API',
          version: '1.0.0',
          docs: '/api/docs',
          health: '/health',
        }),
      );
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const result = appController.getHealth() as { status: string };

      expect(result.status).toBe('ok');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
    });
  });
});
