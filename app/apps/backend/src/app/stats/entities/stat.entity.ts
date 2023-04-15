import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus, RequestMethod } from "@nestjs/common";

@Entity("Stat")
export class StatEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({
    description: "URL, на который обращается клиент",
  })
  @Column({ type: "varchar", length: 128 })
  url: string;

  @ApiProperty({
    description: "Метод запрос",
    type: RequestMethod,
  })
  @Column({ type: "enum", enum: RequestMethod })
  method: RequestMethod;

  @ApiProperty({
    description: "Полученный статус-код запроса",
    type: HttpStatus,
  })
  @Column({ type: "enum", enum: HttpStatus, nullable: true })
  statusCode: HttpStatus;

  @ApiProperty({
    description: "Дата выполнения запроса",
  })
  @Column({ type: "timestamp" })
  date: Date;

  @ApiProperty({
    description: "Время выполнения запроса, в мс",
  })
  @Column({ type: "numeric", default: -1 })
  duration: number;

  @ApiProperty({
    description: "Длина ответа, в мб",
  })
  @Column({ type: "numeric" })
  size: number;

  @ApiProperty({
    description: "Название модуля, который вызвал запрос",
  })
  @Column({ type: "varchar", length: 128 })
  locationOfRequest: string;
}
