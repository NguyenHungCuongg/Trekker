import { AccommodationService } from "./accommodation.service";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";
export declare class AccommodationController {
    private accommodationService;
    constructor(accommodationService: AccommodationService);
    findAll(locationId?: number): Promise<Accommodation[]>;
    search(searchDto: SearchAccommodationDto): Promise<Accommodation[]>;
    findOne(id: number): Promise<Accommodation>;
    findRoomTypes(id: number): Promise<import("../room-type/room-type.entity").RoomType[]>;
}
