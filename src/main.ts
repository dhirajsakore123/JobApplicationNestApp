import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow requests from Next.js frontend
    credentials: true, // Allow cookies and auth headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed request methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  app.use(
    '/uploads',
    express.static(join(__dirname, '..', 'uploads'), {
      setHeaders: (res, path) => {
        res.setHeader('Content-Disposition', 'inline');
      },
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}

void bootstrap();
