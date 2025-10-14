import { DestinationService } from "./destination.service";
import { Destination } from "./destination.entity";
export declare class DestinationController {
    private destinationService;
    constructor(destinationService: DestinationService);
    findAll(locationId?: number): Promise<Destination[]>;
    findOne(id: number): Promise<Destination>;
}
