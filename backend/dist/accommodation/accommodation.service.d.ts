import { Repository } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";
export declare class AccommodationService {
    private accommodationRepository;
    constructor(accommodationRepository: Repository<Accommodation>);
    findAll(): Promise<Accommodation[]>;
    findOne(id: number): Promise<Accommodation>;
    search(searchDto: SearchAccommodationDto): Promise<Accommodation[]>;
    findByLocationId(locationId: number): Promise<Accommodation[]>;
    count(): Promise<number>;
}
