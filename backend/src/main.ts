import 'dotenv/config';

async function bootstrap() {
  console.log('✅ Server is starting...');
  console.log(`🚀 Running on port ${process.env.PORT || 3001}`);
}

bootstrap();