import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger/dist/swagger-module";
import { DocumentBuilder } from "@nestjs/swagger/dist/document-builder";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Dự án NestJS API")
    .setDescription("Danh sách API chi tiết cho ứng dụng của tôi")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Nhập JWT token vào đây",
        in: "header",
      },
      "JWT-auth",
    ) // Nếu dự án có sử dụng JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Thiết lập đường dẫn truy cập Swagger UI
  SwaggerModule.setup("docs", app, document);

  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(configService.get<number>("port") || 3000);
}
bootstrap();
