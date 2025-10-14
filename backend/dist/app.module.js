"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const accommodation_module_1 = require("./accommodation/accommodation.module");
const config_1 = require("@nestjs/config");
const location_module_1 = require("./location/location.module");
const destination_module_1 = require("./destination/destination.module");
const tour_module_1 = require("./tour/tour.module");
const room_type_module_1 = require("./room-type/room-type.module");
const booking_module_1 = require("./booking/booking.module");
const payment_module_1 = require("./payment/payment.module");
const invoice_module_1 = require("./invoice/invoice.module");
const review_module_1 = require("./review/review.module");
const user_entity_1 = require("./user/user.entity");
const location_entity_1 = require("./location/location.entity");
const destination_entity_1 = require("./destination/destination.entity");
const tour_entity_1 = require("./tour/tour.entity");
const accommodation_entity_1 = require("./accommodation/accommodation.entity");
const room_type_entity_1 = require("./room-type/room-type.entity");
const booking_entity_1 = require("./booking/booking.entity");
const payment_entity_1 = require("./payment/payment.entity");
const invoice_entity_1 = require("./invoice/invoice.entity");
const review_entity_1 = require("./review/review.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DB_HOST") || "localhost",
                    port: parseInt(configService.get("DB_PORT") || "5432"),
                    username: configService.get("DB_USERNAME") || "postgres",
                    password: configService.get("DB_PASSWORD") || "",
                    database: configService.get("DB_DATABASE") || "Trekker",
                    entities: [
                        user_entity_1.User,
                        location_entity_1.Location,
                        destination_entity_1.Destination,
                        tour_entity_1.Tour,
                        accommodation_entity_1.Accommodation,
                        room_type_entity_1.RoomType,
                        booking_entity_1.Booking,
                        payment_entity_1.Payment,
                        invoice_entity_1.Invoice,
                        review_entity_1.Review,
                    ],
                    synchronize: configService.get("NODE_ENV") === "development",
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            accommodation_module_1.AccommodationModule,
            location_module_1.LocationModule,
            destination_module_1.DestinationModule,
            tour_module_1.TourModule,
            room_type_module_1.RoomTypeModule,
            booking_module_1.BookingModule,
            payment_module_1.PaymentModule,
            invoice_module_1.InvoiceModule,
            review_module_1.ReviewModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map