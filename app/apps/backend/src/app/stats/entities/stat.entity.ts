import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus, RequestMethod } from "@nestjs/common";
import { DeviceEntity } from "./device.entity";

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
    description: "Метод запроса",
  })
  @Column({ type: "varchar", length: 16 })
  method: string;

  @ApiProperty({
    description: "Полученный статус-код запроса",
    type: HttpStatus,
  })
  @Column({ type: "enum", enum: HttpStatus, nullable: true })
  statusCode: HttpStatus;

  @ApiProperty({
    description: "Дата выполнения запроса",
  })
  @Column({ type: "numeric" })
  date: number;

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
  @Column({ type: "varchar", length: 128, nullable: true })
  locationOfRequest: string;

  @ManyToOne(() => DeviceEntity, (device) => device.stats)
  device: DeviceEntity;
}
