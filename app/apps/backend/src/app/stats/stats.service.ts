import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
      const device = await this.deviceRepository.manager.transaction(async () => {
        const entity = this.deviceRepository.create({
          ...createStatDto.device,
          id: createStatDto.device.deviceId,
        });

        return this.deviceRepository.save(entity).catch(() => {
          throw new ConflictException();
        });
      });

      return this.statsRepository.manager.transaction(async () => {
        const entity = this.statsRepository.create({
          ...createStatDto.stat,
          device,
        });
        return this.statsRepository.save(entity).catch(() => {
          throw new ConflictException();
        });
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<StatEntity[]> {
    const { page = 1, limit = 10 } = paginationQuery ?? {};

    return (await this.statsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    }))[0];
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
