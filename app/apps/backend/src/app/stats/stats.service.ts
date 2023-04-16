import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
    try {
      const device = await this.deviceRepository.create({
        ...createStatDto.device,
        stats: [],
      });

      const entity = this.statsRepository.create(createStatDto.stat);

      device.stats = [entity];
      await this.deviceRepository.save(device);

      return this.statsRepository.save(entity).catch((e) => {
        throw new InternalServerErrorException(e);
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<{ data: StatEntity[], total: number}> {
    const { page = 1, limit = 10 } = paginationQuery ?? {};

    const [data, total] = await this.statsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        device: true,
      },
    });

    return {
      data,
      total,
    };
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
    }).catch(e => {
      throw new NotFoundException(e);
    });
  }

  async findOne(id: number): Promise<StatEntity> {
    return this.statsRepository.findOneOrFail({
      where: {
        id,
      },
    }).catch(e => {
      throw new NotFoundException(e);
    });
  }

  async remove(id: number): Promise<void> {
    await this.statsRepository.delete(id);
  }
}
