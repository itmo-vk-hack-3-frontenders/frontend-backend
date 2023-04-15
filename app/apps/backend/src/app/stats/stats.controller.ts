import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { StatsService } from "./stats.service";
import { CreateStatDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeviceEntity, StatEntity } from "./entities";
import { SwaggerDelete, SwaggerGet, SwaggerPost, SwaggerPagination } from "../../shared/decorators";

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({
    summary: "Создание новой статистики",
  })
  @SwaggerPost()
  @Post()
  async create(@Body() createStatDto: CreateStatDto): Promise<StatEntity> {
    return this.statsService.create(createStatDto);
  }

  @ApiOperation({
    summary: "Получение всей доступной статистики с пагинацией",
  })
  @SwaggerGet()
  @SwaggerPagination()
  @Get()
  async findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limits", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<StatEntity[]> {
    return this.statsService.findAll({ page, limit });
  }

  @ApiOperation({
    summary: "Получение всех девайсов с пагинацией",
  })
  @SwaggerGet()
  @SwaggerPagination()
  @Get("devices")
  async findDevices(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limits", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<DeviceEntity[]> {
    return this.statsService.findDevices({ page, limit });
  }

  @ApiOperation({
    summary: "Получение девайса",
  })
  @SwaggerGet()
  @Get("devices/:id")
  async findDevice(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<DeviceEntity> {
    return this.statsService.findDevice(id);
  }

  @ApiOperation({
    summary: "Получение статистики по идентификатору",
  })
  @SwaggerGet()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<StatEntity> {
    return this.statsService.findOne(id);
  }

  @ApiOperation({
    summary: "Удаление статистики по идентификатору",
  })
  @SwaggerDelete()
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.statsService.remove(id);
  }
}
