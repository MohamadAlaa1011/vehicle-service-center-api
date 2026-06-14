import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): object {
    return {
      name: 'Vehicle Service Center Management System API',
      version: '1.0.0',
      description: 'Production-ready API for managing vehicle service centers',
      docs: '/api/docs',
      health: '/health',
    };
  }

  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid,
    };
  }
}