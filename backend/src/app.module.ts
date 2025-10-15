import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AccommodationModule } from "./accommodation/accommodation.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocationModule } from "./location/location.module";
import { DestinationModule } from "./destination/destination.module";
import { TourModule } from "./tour/tour.module";
import { RoomTypeModule } from "./room-type/room-type.module";
import { BookingModule } from "./booking/booking.module";
import { PaymentModule } from "./payment/payment.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { ReviewModule } from "./review/review.module";
import { User } from "./user/user.entity";
import { Location } from "./location/location.entity";
import { Destination } from "./destination/destination.entity";
import { Tour } from "./tour/tour.entity";
import { Accommodation } from "./accommodation/accommodation.entity";
import { RoomType } from "./room-type/room-type.entity";
import { Booking } from "./booking/booking.entity";
import { Payment } from "./payment/payment.entity";
import { Invoice } from "./invoice/invoice.entity";
import { Review } from "./review/review.entity";
import configuration from "./config/configuration";
import { typeOrmAsyncConfig } from "./config/db.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    AccommodationModule,
    LocationModule,
    DestinationModule,
    TourModule,
    RoomTypeModule,
    BookingModule,
    PaymentModule,
    InvoiceModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
