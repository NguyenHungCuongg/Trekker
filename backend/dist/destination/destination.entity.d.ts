import { Location } from "../location/location.entity";
import { Tour } from "../tour/tour.entity";
export declare class Destination {
    id: number;
    name: string;
    locationId: number;
    location: Location;
    tours: Tour[];
}
