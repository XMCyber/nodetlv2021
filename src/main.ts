import { NestFactory } from '@nestjs/core';
import  * as mongoose  from 'mongoose';
import { AppModule } from './app.module';

function _logError(err) {
  console.error("EXCEPTION:", err && err.stack || err);
}

process.on('uncaughtException', _logError);
process.on('unhandledRejection', _logError);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log("server is listening...");
  
}
bootstrap();
