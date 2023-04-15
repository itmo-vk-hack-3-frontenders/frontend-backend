import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV === "development",
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
