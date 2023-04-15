import { Column, Entity, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class DeviceStatEntity {
  @ApiProperty({
    description: "Device ID",
  })
  @PrimaryColumn()
  readonly id: number;

  @ApiProperty({
    description: "Название устройства",
  })
  @Column({ type: "varchar", length: 128 })
  device: string;

  @ApiProperty({
    description: "Название ОС",
  })
  @Column({ type: "varchar", length: 128 })
  os: string;

  @ApiProperty({
    description: "Версия сборки",
  })
  @Column({ type: "varchar", length: 128 })
  buildVersion: string;

  @Column({ type: "varchar", length: 128 })
  osVersion: string;
}
