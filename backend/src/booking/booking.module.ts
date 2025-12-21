import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Payment } from "../payment/payment.entity";
import { Tour } from "../tour/tour.entity";
import { Accommodation } from "../accommodation/accommodation.entity";
import { RoomType } from "../room-type/room-type.entity";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Payment, Tour, Accommodation, RoomType]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
