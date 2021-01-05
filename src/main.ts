import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_CONFIG } from './config/config.constant';
import { ConfigurationInterface } from './config/config.interface';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigurationInterface = app
    .select(ConfigModule)
    .get(APP_CONFIG);

  app.enableCors({
    origin: [config.origin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Fluent Search BFF')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(config.port);
}
bootstrap();
