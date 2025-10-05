import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tour } from "./tour.entity";
import { TourController } from "./tour.controller";
import { TourService } from "./tour.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
