import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "dpg-cgta8nqut4mcfrksb4kg-a.frankfurt-postgres.render.com",
      port: 5432,
      username: "user",
      password: "rcKmpgfHalUYsbP1DU6HT7D8kOrUHpa3",
      database: "database_n79i",
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
