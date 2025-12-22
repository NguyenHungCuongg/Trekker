import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tour } from "./tour.entity";
import { Repository } from "typeorm";
import { SearchTourDto } from "./dto/search-tour.dto";
import { TourCardDto } from "./dto/tour-card.dto";

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  async findAll(): Promise<Tour[]> {
    const result = await this.tourRepository
      .createQueryBuilder("tour")
      .leftJoinAndSelect("tour.location", "location")
      .leftJoinAndSelect("tour.destinations", "destinations")
      .leftJoin(
        "reviews",
        "review",
        "review.service_type = 'tour' AND review.service_id = tour.id",
      )
      .select([
        "tour",
        "location",
        "destinations",
        "COALESCE(ROUND(AVG(review.rating)::numeric, 1), 0) as calculated_rating",
      ])
      .groupBy("tour.id")
      .addGroupBy("location.id")
      .addGroupBy("destinations.id")
      .getRawAndEntities();

    return result.entities.map((tour, index) => {
      const calculatedRating =
        parseFloat(result.raw[index].calculated_rating) || 0;
      return {
        ...tour,
        rating: calculatedRating,
      };
    });
  }

  async findOne(id: number): Promise<Tour> {
    const result = await this.tourRepository
      .createQueryBuilder("tour")
      .leftJoinAndSelect("tour.location", "location")
      .leftJoinAndSelect("tour.destinations", "destinations")
      .leftJoin(
        "reviews",
        "review",
        "review.service_type = 'tour' AND review.service_id = tour.id",
      )
      .select([
        "tour",
        "location",
        "destinations",
        "COALESCE(ROUND(AVG(review.rating)::numeric, 1), 0) as calculated_rating",
      ])
      .where("tour.id = :id", { id })
      .groupBy("tour.id")
      .addGroupBy("location.id")
      .addGroupBy("destinations.id")
      .getRawAndEntities();

    if (!result.entities || result.entities.length === 0) {
      throw new NotFoundException(`Không tìm thấy tour với id ${id}`);
    }

    const tour = result.entities[0];
    const calculatedRating = parseFloat(result.raw[0].calculated_rating) || 0;

    return {
      ...tour,
      rating: calculatedRating,
    };
  }

  async search(searchDto: SearchTourDto): Promise<Tour[]> {
    const query = this.tourRepository
      .createQueryBuilder("tour")
      .leftJoinAndSelect("tour.location", "location")
      .leftJoinAndSelect("tour.destinations", "destinations")
      .leftJoin(
        "reviews",
        "review",
        "review.service_type = 'tour' AND review.service_id = tour.id",
      )
      .select([
        "tour",
        "location",
        "destinations",
        "COALESCE(ROUND(AVG(review.rating)::numeric, 1), 0) as calculated_rating",
      ])
      .groupBy("tour.id")
      .addGroupBy("location.id")
      .addGroupBy("destinations.id");

    if (searchDto.name) {
      query.andWhere("LOWER(tour.name) LIKE LOWER(:name)", {
        name: `%${searchDto.name}%`,
      });
    }
    if (searchDto.locationId) {
      query.andWhere("tour.locationId = :locationId", {
        locationId: searchDto.locationId,
      });
    }
    if (searchDto.destinationId) {
      query.andWhere("destinations.id = :destinationId", {
        destinationId: searchDto.destinationId,
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
      query.having("COALESCE(AVG(review.rating), 0) >= :minRating", {
        minRating: searchDto.minRating,
      });
    }
    if (searchDto.maxGuests) {
      query.andWhere("tour.maxGuests <= :maxGuests", {
        maxGuests: searchDto.maxGuests,
      });
    }

    const result = await query.getRawAndEntities();

    // Merge calculated rating into entities
    return result.entities.map((tour, index) => {
      const calculatedRating =
        parseFloat(result.raw[index].calculated_rating) || 0;
      return {
        ...tour,
        rating: calculatedRating,
      };
    });
  }

  async findByLocationId(locationId: number): Promise<Tour[]> {
    const result = await this.tourRepository
      .createQueryBuilder("tour")
      .leftJoinAndSelect("tour.location", "location")
      .leftJoinAndSelect("tour.destinations", "destinations")
      .leftJoin(
        "reviews",
        "review",
        "review.service_type = 'tour' AND review.service_id = tour.id",
      )
      .select([
        "tour",
        "location",
        "destinations",
        "COALESCE(ROUND(AVG(review.rating)::numeric, 1), 0) as calculated_rating",
      ])
      .where("tour.locationId = :locationId", { locationId })
      .groupBy("tour.id")
      .addGroupBy("location.id")
      .addGroupBy("destinations.id")
      .getRawAndEntities();

    return result.entities.map((tour, index) => {
      const calculatedRating =
        parseFloat(result.raw[index].calculated_rating) || 0;
      return {
        ...tour,
        rating: calculatedRating,
      };
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

  async findTopTours(limit?: number): Promise<TourCardDto[]> {
    const rawSql = `
      SELECT 
        t.tour_id AS id,
        t.name AS name,
        t.price AS price,
        COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS rating,
        l.name AS location,
        t.image AS image
      FROM tours t
      LEFT JOIN locations l ON t.location_id = l.location_id
      LEFT JOIN reviews r ON r.service_type = 'tour' AND r.service_id = t.tour_id
      GROUP BY t.tour_id, t.name, t.price, l.name, t.image
      ORDER BY rating DESC, t.name ASC
    `;

    const hasLimit = limit && limit > 0;
    const sql = hasLimit ? `${rawSql} LIMIT $1` : rawSql;
    const params = hasLimit ? [limit] : [];

    const tours: TourCardDto[] = await this.tourRepository.query(sql, params);
    return tours;
  }
}
