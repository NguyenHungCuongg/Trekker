import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Accommodation } from "./accommodation.entity";

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return this.accommodationRepository.find({
      relations: ["location", "roomTypes"],
    });
  }

  async findOne(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationRepository.findOne({
      where: { id },
      relations: ["location", "roomTypes"],
    });
    if (!accommodation) {
      throw new NotFoundException(`Không tìm thấy accommodation với id ${id}`);
    }
    return accommodation;
  }

  async findByLocationId(locationId: number): Promise<Accommodation[]> {
    return this.accommodationRepository.find({
      where: { locationId },
      relations: ["location", "roomTypes"],
    });
  }

  async count(): Promise<number> {
    return this.accommodationRepository.count();
  }
}
