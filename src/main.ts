import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configSetup = app.get(ConfigService);
  const port: number = configSetup.get('port');
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, transform: true }));
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Separacion Cuentas')
    .setDescription('Separacion cuentas')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  document.servers = [{url: 'http://localhost:3800', description: 'Servidor local' }]
  SwaggerModule.setup('/contact-api/docs', app, document, { customCss: '.swagger-ui .topbar { display: none }'});
  await app.listen(port);
}
bootstrap();
