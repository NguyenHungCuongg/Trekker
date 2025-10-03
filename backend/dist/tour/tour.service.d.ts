import { Tour } from "./tour.entity";
import { Repository } from "typeorm";
export declare class TourService {
    private tourRepository;
    constructor(tourRepository: Repository<Tour>);
    findAll(): Promise<Tour[]>;
    findOne(id: number): Promise<Tour>;
    findByLocationId(locationId: number): Promise<Tour[]>;
    count(): Promise<number>;
}
