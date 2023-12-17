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
    // ne pas oublier d'enlever le _DEV pour la prod
    // origin: '*',
    // origin: configService.get<string>('FRONTEND_URL'),
    allowedHeaders: [
      'Content-Type, Accept, Access-Control-Allow-Origin, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers'
    ],
    origin: 'https://church-ordinances-front-noa1527.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
