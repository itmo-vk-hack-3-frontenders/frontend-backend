import { ConflictException, Injectable } from "@nestjs/common";
import { CreateStatDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity, StatEntity } from "./entities";
import { Repository } from "typeorm";
import { PaginationQueryDto } from "../../shared/pagination-query.dto";

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(StatEntity)
    private readonly statsRepository: Repository<StatEntity>,

    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  async create(createStatDto: CreateStatDto): Promise<StatEntity> {
    return this.statsRepository.manager.transaction(async () => {
      const entity = this.statsRepository.create(createStatDto);
      return this.statsRepository.save(entity).catch(() => {
        throw new ConflictException();
      });
    });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<StatEntity[]> {
    const { page = 1, limit = 10 } = paginationQuery ?? {};

    return this.statsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findDevices(paginationQuery: PaginationQueryDto): Promise<DeviceEntity[]> {
    const { page = 1, limit = 10 } = paginationQuery ?? {};

    return this.deviceRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findDevice(id: string): Promise<DeviceEntity> {
    return this.deviceRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findOne(id: number): Promise<StatEntity> {
    return this.statsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.statsRepository.delete(id);
  }
}
