import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tour } from "./tour.entity";
import { Repository } from "typeorm";
import { SearchTourDto } from "./dto/search-tour.dto";

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

  async search(searchDto: SearchTourDto): Promise<Tour[]> {
    const query = this.tourRepository
      .createQueryBuilder("tour")
      .leftJoinAndSelect("tour.location", "location")
      .leftJoinAndSelect("tour.destinations", "destinations");
    if (searchDto.locationId) {
      query.andWhere("tour.locationId = :locationId", {
        locationId: searchDto.locationId,
      });
    }
    if (searchDto.minPrice) {
      query.andWhere("tour.price >= :minPrice", {
        minPrice: searchDto.minPrice,
      });
    }
    if (searchDto.maxPrice) {
      query.andWhere("tour.price <= :maxPrice", {
        maxPrice: searchDto.maxPrice,
      });
    }
    if (searchDto.startDate) {
      query.andWhere("tour.startDate >= :startDate", {
        startDate: searchDto.startDate,
      });
    }
    if (searchDto.endDate) {
      query.andWhere("tour.endDate <= :endDate", {
        endDate: searchDto.endDate,
      });
    }
    if (searchDto.minRating) {
      query.andWhere("tour.rating >= :minRating", {
        minRating: searchDto.minRating,
      });
    }
    if (searchDto.maxGuests) {
      query.andWhere("tour.maxGuests <= :maxGuests", {
        maxGuests: searchDto.maxGuests,
      });
    }
    return query.getMany();
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

  async create(createTourDto: Partial<Tour>): Promise<Tour> {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  async update(id: number, updateTourDto: Partial<Tour>): Promise<Tour> {
    const tour = await this.findOne(id);
    Object.assign(tour, updateTourDto);
    return this.tourRepository.save(tour);
  }

  async remove(id: number): Promise<void> {
    const tour = await this.findOne(id);
    await this.tourRepository.remove(tour);
  }
}
