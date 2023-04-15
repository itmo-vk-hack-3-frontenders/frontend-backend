import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity, StatEntity } from "./entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StatEntity,
      DeviceEntity,
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
