import { Booking } from "../booking/booking.entity";
export declare class Invoice {
    id: number;
    bookingId: number;
    totalAmount: number;
    createdAt: Date;
    details: string;
    booking: Booking;
}
