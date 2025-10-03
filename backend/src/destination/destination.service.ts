import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Destination } from "./destination.entity";

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find({
      relations: ["locations", "tours"],
    });
  }

  async findOne(id: number): Promise<Destination> {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations: ["locations", "tours"],
    });

    if (!destination) {
      throw new NotFoundException(`Không tìm thấy destination với id ${id}`);
    }

    return destination;
  }

  async findByLocationId(locationId: number): Promise<Destination[]> {
    return this.destinationRepository.find({
      where: { locationId },
      relations: ["locations"],
    });
  }

  async count(): Promise<number> {
    return this.destinationRepository.count();
  }
}
