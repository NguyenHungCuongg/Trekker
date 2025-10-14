import { Location } from "../location/location.entity";
import { RoomType } from "../room-type/room-type.entity";
export declare class Accommodation {
    id: number;
    locationId: number;
    name: string;
    description: string;
    rating: number;
    phone: string;
    email: string;
    address: string;
    location: Location;
    roomTypes: RoomType[];
}
