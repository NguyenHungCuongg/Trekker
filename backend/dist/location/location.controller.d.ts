import { LocationService } from "./location.service";
import { Location } from "./location.entity";
export declare class LocationController {
    private locationService;
    constructor(locationService: LocationService);
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
}
