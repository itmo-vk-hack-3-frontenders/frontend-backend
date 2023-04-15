import { Module } from "@nestjs/common";
import { StatsModule } from "./stats/stats.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    StatsModule,
  ],
})
export class AppModule {
}
