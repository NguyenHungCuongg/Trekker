import { Repository } from "typeorm";
import { Destination } from "./destination.entity";
export declare class DestinationService {
    private destinationRepository;
    constructor(destinationRepository: Repository<Destination>);
    findAll(): Promise<Destination[]>;
    findOne(id: number): Promise<Destination>;
    findByLocationId(locationId: number): Promise<Destination[]>;
    count(): Promise<number>;
}
