import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(port);
  console.log('✅ Server is starting...');
  console.log(`🚀 Running on port ${port}`);
}

bootstrap();