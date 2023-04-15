import { HttpStatus, RequestMethod } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateStatDto {
  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsEnum(RequestMethod)
  method: RequestMethod;

  @ApiProperty()
  @IsEnum(HttpStatus)
  statusCode: HttpStatus;

  @ApiProperty()
  @IsPositive()
  date: number;

  @ApiProperty()
  @IsPositive()
  duration: number;

  @ApiProperty()
  @IsPositive()
  size: number;

  @ApiProperty()
  @IsString()
  locationOfRequest: string;
}
