import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function SwaggerPagination(): any {
  return applyDecorators(
    ApiQuery({ name: "page", type: Number }),
    ApiQuery({ name: "limits", type: Number }),
  );
}
