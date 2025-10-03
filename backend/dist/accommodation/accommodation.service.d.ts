import { Repository } from "typeorm";
import { Accommodation } from "./accommodation.entity";
export declare class AccommodationService {
    private accommodationRepository;
    constructor(accommodationRepository: Repository<Accommodation>);
    findAll(): Promise<Accommodation[]>;
    findOne(id: number): Promise<Accommodation>;
    findByLocationId(locationId: number): Promise<Accommodation[]>;
    count(): Promise<number>;
}
