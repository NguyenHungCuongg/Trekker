import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
//import { LoggerModule } from './common/middleware/logger/logger.module';
import { AuthModule } from "./auth/auth.module";
import { AccommodationModule } from "./accommodation/accommodation.module";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      database: "Trekker",
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    AccommodationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
