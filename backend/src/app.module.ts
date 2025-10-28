import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AccommodationModule } from "./accommodation/accommodation.module";
import { ConfigModule } from "@nestjs/config";
import { LocationModule } from "./location/location.module";
import { DestinationModule } from "./destination/destination.module";
import { TourModule } from "./tour/tour.module";
import { RoomTypeModule } from "./room-type/room-type.module";
import { BookingModule } from "./booking/booking.module";
import { PaymentModule } from "./payment/payment.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { ReviewModule } from "./review/review.module";
import configuration from "./config/configuration";
import { typeOrmAsyncConfig } from "./config/db.config";
import { EmailModule } from "./email/email.module";
import { VerificationCodeModule } from "./verification-code/verification-code.module";

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
    EmailModule,
    VerificationCodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
