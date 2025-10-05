import { Location } from "../location/location.entity";
import { Destination } from "../destination/destination.entity";
export declare class Tour {
    id: number;
    locationId: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    rating: number;
    startDate: Date;
    endDate: Date;
    maxGuests: number;
    location: Location;
    destinations: Destination[];
}
