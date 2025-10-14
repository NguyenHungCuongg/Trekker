import { Repository } from "typeorm";
import { Location } from "./location.entity";
export declare class LocationService {
    private locationRepository;
    constructor(locationRepository: Repository<Location>);
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    count(): Promise<number>;
}
