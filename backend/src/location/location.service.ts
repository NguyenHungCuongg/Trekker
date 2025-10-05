import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "./location.entity";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({
      relations: ["tours", "accommodations"],
    });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ["tours", "accommodations", "destinations"],
    });

    if (!location) {
      throw new NotFoundException(`Không tìm thấy location với id ${id}`);
    }
    return location;
  }

  async count(): Promise<number> {
    return this.locationRepository.count();
  }
}
