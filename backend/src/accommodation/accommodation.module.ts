import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accommodation } from "./accommodation.entity";
import { AccommodationService } from "./accommodation.service";
import { AccommodationController } from "./accommodation.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  providers: [AccommodationService],
  controllers: [AccommodationController],
  exports: [AccommodationService],
})
export class AccommodationModule {}
