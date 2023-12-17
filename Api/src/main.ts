import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  // const frontendUrls = configService.get<string>('FRONTEND_URL').split(',');
  // console.log('front url',frontendUrls);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: [
      'Content-Type', 'Accept', 'Authorization'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    // origin: '*',
    // origin: 'https://church-ordinances-front.vercel.app',
    // ne pas oublier d'enlever le _DEV pour la prod
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
