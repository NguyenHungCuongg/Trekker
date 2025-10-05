import { Tour } from "./tour.entity";
import { Repository } from "typeorm";
import { SearchTourDto } from "./dto/search-tour.dto";
export declare class TourService {
    private tourRepository;
    constructor(tourRepository: Repository<Tour>);
    findAll(): Promise<Tour[]>;
    findOne(id: number): Promise<Tour>;
    search(searchDto: SearchTourDto): Promise<Tour[]>;
    findByLocationId(locationId: number): Promise<Tour[]>;
    count(): Promise<number>;
}
