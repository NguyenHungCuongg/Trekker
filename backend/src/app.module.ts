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
import config from "config/configuration";
import configuration from "config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST") || "localhost",
        port: parseInt(configService.get("DB_PORT") || "5432"),
        username: configService.get("DB_USERNAME") || "postgres",
        password: configService.get("DB_PASSWORD") || "",
        database: configService.get("DB_DATABASE") || "Trekker",
        entities: [
          User,
          Location,
          Destination,
          Tour,
          Accommodation,
          RoomType,
          Booking,
          Payment,
          Invoice,
          Review,
        ],
        synchronize: configService.get("NODE_ENV") === "development",
      }),
      inject: [ConfigService],
    }),
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
