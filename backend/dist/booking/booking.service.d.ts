import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingService {
    private bookingRepository;
    constructor(bookingRepository: Repository<Booking>);
    findAll(userId?: number): Promise<Booking[]>;
    findOne(id: number, userId?: number): Promise<Booking>;
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    remove(id: number, userId?: number): Promise<void>;
    cancel(id: number, userId?: number): Promise<Booking>;
    findByUserId(userId: number): Promise<Booking[]>;
    count(userId?: number): Promise<number>;
}
