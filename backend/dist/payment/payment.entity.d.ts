import { Booking } from "../booking/booking.entity";
import { PaymentMethod, PaymentStatus } from "../common/enums";
export declare class Payment {
    id: number;
    bookingId: number;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    paidAt: Date;
    booking: Booking;
}
