import { TourService } from "./tour.service";
import { Tour } from "./tour.entity";
import { SearchTourDto } from "./dto/search-tour.dto";
export declare class TourController {
    private tourService;
    constructor(tourService: TourService);
    findAll(locationId: number): Promise<Tour[]>;
    search(searchDto: SearchTourDto): Promise<Tour[]>;
    findOne(id: number): Promise<Tour>;
}
