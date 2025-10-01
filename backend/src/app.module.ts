import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { AuthModule } from "./auth/auth.module";
import { AccommodationModule } from "./accommodation/accommodation.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
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
        entities: [User],
        synchronize: configService.get("NODE_ENV") === "development",
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AccommodationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
