import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:4200',
    methods:'GET,HEAD,POST,PUT,PATCH,DELETE',
    credentials:true
  });
  app.use(bodyParser.json({limit:'10mb'})); 
  app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))
  await app.listen(3000);
}
bootstrap();
