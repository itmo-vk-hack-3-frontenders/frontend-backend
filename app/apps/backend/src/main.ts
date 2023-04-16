import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./shared/http-exception.filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.BACKEND_PORT || 3000;

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

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
