import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DB_URL,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV === "development",
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
