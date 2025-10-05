import { Accommodation } from "../accommodation/accommodation.entity";
export declare class RoomType {
    id: number;
    accommodationId: number;
    name: string;
    capacity: number;
    price: number;
    amenities: string;
    description: string;
    accommodation: Accommodation;
}
