import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api";
  app.setGlobalPrefix("globalPrefix");

  const port = process.env.BACKEND_PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle("ITMO / VK / OK Hack")
    .setDescription("Описание контракта")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port);
  Logger.log(`📚 Docs are running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
