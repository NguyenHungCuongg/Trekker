import { Module } from "@nestjs/common";
import { VnpayService } from "./vnpay.service";
import { VnpayController } from "./vnpay.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/booking/booking.entity";
import { BookingModule } from "src/booking/booking.module";
import { Payment } from "src/payment/payment.entity";
import { PaymentModule } from "src/payment/payment.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Payment]),
    BookingModule,
    PaymentModule,
  ],
  providers: [VnpayService],
  controllers: [VnpayController],
})
export class VnpayModule {}
