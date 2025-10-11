import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Destination } from "./destination.entity";
import { DestinationService } from "./destination.service";
import { DestinationController } from "./destination.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  controllers: [DestinationController],
  exports: [DestinationService],
})
export class DestinationModule {}
