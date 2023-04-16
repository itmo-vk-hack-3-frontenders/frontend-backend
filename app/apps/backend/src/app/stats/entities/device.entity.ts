import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { StatEntity } from "./stat.entity";

@Entity("Device")
export class DeviceEntity {
  @ApiProperty({
    description: "Device ID",
  })
  @PrimaryColumn()
  readonly id: string;

  @ApiProperty({
    description: "Название устройства",
  })
  @Column({ type: "varchar", length: 128 })
  name: string;

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

  @OneToMany(() => StatEntity, (stat) => stat.device, {
    cascade: true,
  })
  stats: StatEntity[];
}
