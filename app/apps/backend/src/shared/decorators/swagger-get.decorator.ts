import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function SwaggerGet(): any {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.OK, description: "Ресурс получен" }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Ресурс не найден" }),
  );
}
