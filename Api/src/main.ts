import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService: ConfigService = app.get(ConfigService);
  
  app.enableCors({
    // origin: configService.get<string>('FRONTEND_URL'),
    origin: '*',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: [
      'Content-Type', 'Accept', 'Authorization'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
