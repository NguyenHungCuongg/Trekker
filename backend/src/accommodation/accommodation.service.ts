import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";

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

  async search(searchDto: SearchAccommodationDto): Promise<Accommodation[]> {
    const query = this.accommodationRepository
      .createQueryBuilder("accommodation")
      .leftJoinAndSelect("accommodation.location", "location")
      .leftJoinAndSelect("accommodation.roomTypes", "roomTypes");
    if (searchDto.locationId) {
      query.andWhere("accommodation.locationId = :locationId", {
        locationId: searchDto.locationId,
      });
    }
    if (searchDto.minRating) {
      query.andWhere("accomodation.rating >= :minRating", {
        minRating: searchDto.minRating,
      });
    }
    if (searchDto.name) {
      query.andWhere("accommodation.name ILIKE :name", {
        name: `%${searchDto.name}%`,
      });
    }
    return query.getMany();
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
