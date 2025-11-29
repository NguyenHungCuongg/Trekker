import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "./location.entity";
import { LocationCardDto } from "./dto/location-card.dto";
import { snakeToCamel } from "src/utils/snakeToCamel";
import { plainToInstance } from "class-transformer";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
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

  async findTopLocations(): Promise<LocationCardDto[]> {
    const locations: LocationCardDto[] = await this.locationRepository.query(
      `
      SELECT 
        l.location_id AS id,
        l.name AS name,
        l.description AS description,
        l.image AS image,
        COUNT(DISTINCT t.tour_id) AS tour_count,
        COUNT(DISTINCT a.accommodation_id) AS accommodation_count
      FROM locations l
        LEFT JOIN tours t ON l.location_id = t.location_id
        LEFT JOIN destinations d ON l.location_id = d.location_id
        LEFT JOIN accommodations a ON d.destination_id = a.destination_id
      GROUP BY l.location_id, l.name, l.description, l.image
      ORDER BY accommodation_count DESC
      LIMIT 4
        `,
    );

    const camelRows = locations.map((r) => snakeToCamel(r));

    return plainToInstance(LocationCardDto, camelRows, {
      excludeExtraneousValues: true,
    });
  }
}
