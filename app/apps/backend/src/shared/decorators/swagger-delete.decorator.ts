import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function SwaggerDelete(): any {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.OK, description: "Ресурс удален" }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Ресурс не найден" }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Неверный запрос" }),
    ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Ошибка сервера" }),
  );
}
