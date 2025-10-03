import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "./location.entity";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private LocationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.LocationRepository.find({
      relations: ["tours", "accommodations"],
    });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.LocationRepository.findOne({
      where: { id },
      relations: ["tours", "accommodations", "destinations"],
    });

    if (!location) {
      throw new NotFoundException(`Không tìm thấy location với id ${id}`);
    }
    return location;
  }

  async count(): Promise<number> {
    return this.LocationRepository.count();
  }
}
