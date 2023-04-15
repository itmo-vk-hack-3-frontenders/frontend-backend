import { Module } from "@nestjs/common";
import { StatsModule } from "./stats/stats.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [DatabaseModule, StatsModule],
})
export class AppModule {}
