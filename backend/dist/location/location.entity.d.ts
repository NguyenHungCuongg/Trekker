import { Destination } from "../destination/destination.entity";
import { Tour } from "../tour/tour.entity";
import { Accommodation } from "../accommodation/accommodation.entity";
export declare class Location {
    id: number;
    name: string;
    description: string;
    destinations: Destination[];
    tours: Tour[];
    accommodations: Accommodation[];
}
