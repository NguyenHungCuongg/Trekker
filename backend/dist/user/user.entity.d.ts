import { Booking } from "../booking/booking.entity";
import { Review } from "../review/review.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    fullName: string;
    phone: string;
    createdAt: Date;
    bookings: Booking[];
    reviews: Review[];
}
