import { HttpStatus, RequestMethod } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsPositive, IsString, IsUrl } from "class-validator";

class StatDto {
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

class DeviceDto {
  @ApiProperty()
  @IsString()
  buildVersion: string;

  @ApiProperty()
  @IsString()
  os: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  osVersion: string;
}

export class CreateStatDto {
  @ApiProperty({
    type: StatDto,
  })
  stat: StatDto;

  @ApiProperty({
    type: DeviceDto,
  })
  device: DeviceDto;
}
