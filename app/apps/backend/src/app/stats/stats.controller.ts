import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, ParseIntPipe } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { CreateStatDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeviceEntity, StatEntity } from "./entities";
import { PaginationQueryDto } from "../../shared/pagination-query.dto";

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({
    summary: "Создание новой статистики",
  })
  @Post()
  async create(@Body() createStatDto: CreateStatDto): Promise<StatEntity> {
    return this.statsService.create(createStatDto);
  }

  @ApiOperation({
    summary: "Получение всей доступной статистики с пагинацией",
  })
  @Get()
  async findAll(
    @Query() paginationQuery?: PaginationQueryDto,
  ): Promise<StatEntity[]> {
    return this.statsService.findAll(paginationQuery);
  }

  @ApiOperation({
    summary: "Получение всех девайсов с пагинацией",
  })
  @Get("devices")
  async findDevices(
    @Query() paginationQuery?: PaginationQueryDto,
  ): Promise<DeviceEntity[]> {
    return this.statsService.findDevices(paginationQuery);
  }

  @ApiOperation({
    summary: "Получение девайса",
  })
  @Get("devices/:id")
  async findDevice(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<DeviceEntity> {
    return this.statsService.findDevice(id);
  }

  @ApiOperation({
    summary: "Получение статистики по идентификатору",
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<StatEntity> {
    return this.statsService.findOne(id);
  }

  @ApiOperation({
    summary: "Удаление статистики по идентификатору",
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.statsService.remove(+id);
  }
}
