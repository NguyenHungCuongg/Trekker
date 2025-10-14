import { BookingService } from "./booking.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    findAll(req: any): Promise<Booking[]>;
    findOne(id: number, req: any): Promise<Booking>;
    create(createBookingDto: CreateBookingDto, req: any): Promise<Booking>;
    cancel(id: number, req: any): Promise<Booking>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
}
