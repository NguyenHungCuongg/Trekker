import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Destination } from "./destination.entity";
import { DestinationCardDto } from "./dto/destination-card.dto";
import { plainToInstance } from "class-transformer";
import { snakeToCamel } from "src/utils/snakeToCamel";

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find({
      relations: ["location", "tours"],
    });
  }

  async findOne(id: number): Promise<Destination> {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations: ["location", "tours"],
    });

    if (!destination) {
      throw new NotFoundException(`Không tìm thấy destination với id ${id}`);
    }

    return destination;
  }

  async findByLocationId(locationId: number): Promise<Destination[]> {
    return this.destinationRepository.find({
      where: { locationId },
      relations: ["location"],
    });
  }

  async count(): Promise<number> {
    return this.destinationRepository.count();
  }

  async findTopDestinations(limit?: number): Promise<DestinationCardDto[]> {
    const rawSql = `
      SELECT 
        d.destination_id AS id,
        d.name AS name,
        d.location_id AS location_id,
        d.image AS image,
        COUNT(td.tour_id) AS tour_count
      FROM destinations d
      LEFT JOIN tour_destination td ON d.destination_id = td.destination_id
      GROUP BY d.destination_id, d.name, d.location_id
      ORDER BY tour_count DESC
    `;

    const hasLimit = limit && limit > 0;
    const sql = hasLimit ? `${rawSql} LIMIT $1` : rawSql;
    const params = hasLimit ? [limit] : [];

    const destinations: DestinationCardDto[] =
      await this.destinationRepository.query(sql, params);

    const camelRows = destinations.map((r) => snakeToCamel(r));

    return plainToInstance(DestinationCardDto, camelRows, {
      excludeExtraneousValues: true,
    });
  }
}
