import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GeneralExceptionFilter } from './filters/exceptions/http-exception.filter';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: configService.get('redis'),
  });

  app.useGlobalFilters(new GeneralExceptionFilter());

  await app.listen();
}
bootstrap();
