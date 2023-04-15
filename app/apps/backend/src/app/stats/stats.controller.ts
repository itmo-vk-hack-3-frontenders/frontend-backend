import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { UpdateStatDto, CreateStatDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({
    summary: "Создание новой статистики",
  })
  @Post()
  async create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @ApiOperation({
    summary: "Получение всей доступной статистики с пагинацией",
  })
  @Get()
  async findAll() {
    return this.statsService.findAll();
  }

  @ApiOperation({
    summary: "Получение статистики по идентификатору",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.statsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Обновление статистики по идентификатору",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.update(+id, updateStatDto);
  }

  @ApiOperation({
    summary: "Удаление статистики по идентификатору",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.statsService.remove(+id);
  }
}
