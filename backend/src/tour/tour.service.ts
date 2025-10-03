import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tour } from "./tour.entity";
import { Repository } from "typeorm";

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find({
      relations: ["location", "destinations"],
    });
  }

  async findOne(id: number): Promise<Tour> {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ["location", "destinations"],
    });
    if (!tour) {
      throw new NotFoundException(`Không tìm thấy tour với id ${id}`);
    }
    return tour;
  }

  async findByLocationId(locationId: number): Promise<Tour[]> {
    return this.tourRepository.find({
      where: { locationId },
      relations: ["location", "destinations"],
    });
  }

  async count(): Promise<number> {
    return this.tourRepository.count();
  }
}
