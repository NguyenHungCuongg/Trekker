import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";
import { AccommodationCardDto } from "./dto/accomodation-card.dto";
import { plainToInstance } from "class-transformer";
import { snakeToCamel } from "src/utils/snakeToCamel";

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return this.accommodationRepository.find({
      relations: ["destination", "roomTypes"],
    });
  }

  async findOne(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationRepository.findOne({
      where: { id },
      relations: ["destination", "roomTypes"],
    });
    if (!accommodation) {
      throw new NotFoundException(`Không tìm thấy accommodation với id ${id}`);
    }
    return accommodation;
  }

  async search(searchDto: SearchAccommodationDto): Promise<any[]> {
    const query = this.accommodationRepository
      .createQueryBuilder("accommodation")
      .leftJoinAndSelect("accommodation.destination", "destination")
      .leftJoinAndSelect("accommodation.roomTypes", "roomTypes");

    if (searchDto.destinationId) {
      query.andWhere("accommodation.destinationId = :destinationId", {
        destinationId: searchDto.destinationId,
      });
    }
    if (searchDto.minRating) {
      query.andWhere("accommodation.rating >= :minRating", {
        minRating: searchDto.minRating,
      });
    }
    if (searchDto.name) {
      query.andWhere("accommodation.name ILIKE :name", {
        name: `%${searchDto.name}%`,
      });
    }

    const accommodations = await query.getMany();

    // Calculate minPrice from roomTypes for each accommodation
    return accommodations.map((accommodation) => {
      const minPrice = accommodation.roomTypes?.length
        ? Math.min(...accommodation.roomTypes.map((rt) => rt.price))
        : 0;

      return {
        ...accommodation,
        pricePerNight: minPrice.toString(),
      };
    });
  }

  async findByDestinationId(destinationId: number): Promise<Accommodation[]> {
    return this.accommodationRepository.find({
      where: { destinationId },
      relations: ["destination", "roomTypes"],
    });
  }

  async count(): Promise<number> {
    return this.accommodationRepository.count();
  }

  async create(
    createAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    const accommodation = this.accommodationRepository.create(
      createAccommodationDto,
    );
    return this.accommodationRepository.save(accommodation);
  }

  async update(
    id: number,
    updateAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    const accommodation = await this.findOne(id);
    Object.assign(accommodation, updateAccommodationDto);
    return this.accommodationRepository.save(accommodation);
  }

  async remove(id: number): Promise<void> {
    const accommodation = await this.findOne(id);
    await this.accommodationRepository.remove(accommodation);
  }

  async findAccommodationCards(
    limit?: number,
  ): Promise<AccommodationCardDto[]> {
    const rawSql = `
      SELECT
        a.accommodation_id AS id,
        a.name AS name,
        min_price_info.min_price AS price_per_night,
        a.rating AS rating,
        d.name AS destination,
        a.image AS image
        FROM
        accommodations a
        LEFT JOIN destinations d ON d.destination_id = a.destination_id
        JOIN
          (SELECT
              accommodation_id,
              MIN(price) AS min_price
          FROM
              room_types
          GROUP BY
              accommodation_id
          ) AS min_price_info
        ON
        a.accommodation_id = min_price_info.accommodation_id
        GROUP BY a.accommodation_id, a.name, d.name, min_price_info.min_price
        ORDER BY a.rating DESC
      `;

    const hasLimit = limit && limit > 0;
    const sql = hasLimit ? `${rawSql} LIMIT $1` : rawSql;
    const params = hasLimit ? [limit] : [];

    const accommodations: AccommodationCardDto[] =
      await this.accommodationRepository.query(sql, params);

    const camelRows = accommodations.map((r) => snakeToCamel(r));

    return plainToInstance(AccommodationCardDto, camelRows, {
      excludeExtraneousValues: true,
    });
  }
}
