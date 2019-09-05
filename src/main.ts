import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

interface ServerConfig {
  port: number;
}

async function bootstrap() {
  const serverConfig: ServerConfig = config.get('server');
  const logger = new Logger('bootstrap()');

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`application listening on port ${port}`);
}
bootstrap();
