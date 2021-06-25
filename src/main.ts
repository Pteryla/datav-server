import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加全局请求前缀datav
  app.setGlobalPrefix('datav');
  await app.listen(3000);
}

bootstrap();
