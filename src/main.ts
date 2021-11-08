import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session'
// import * as passport from 'passport'
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { ConfigService } from 'nestjs-config';
import { appLoggerDevelopment, appLoggerProduction } from './app.logger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // await app.listen(8000);
  const configService = app.get(ConfigService);

  let appLogger = appLoggerDevelopment;

  if (configService.get('app.environment') !== 'development')
  appLogger = appLoggerProduction;

  app.useLogger(appLogger);
  app.use(helmet());
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const logger = new Logger('NestApplication');
  const cors = configService.get('app.cors');
  // const cors = 
  const name = configService.get('app.name');
  const version = configService.get('app.version');
  const environment = configService.get('app.environment');
  const port = configService.get('app.port');

  if (cors) app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => {
    logger.log(`${name} - ${version}`);
    logger.log(`On ${environment} environment`);
    logger.log(`Enable CORS ${cors}`);
    logger.log(`Started on port ${port}`);
  });

  
}
bootstrap();