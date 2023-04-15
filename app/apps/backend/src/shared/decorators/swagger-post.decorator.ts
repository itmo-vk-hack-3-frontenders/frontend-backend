import { applyDecorators,HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function SwaggerPost(): any {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.CREATED, description: "Ресурс успешно создан" }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Неверный запрос" }),
    ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Ошибка сервера" }),
  );
}
