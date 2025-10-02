import { Module } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { DestinationController } from "./destination.controller";

@Module({
  providers: [DestinationService],
  controllers: [DestinationController],
})
export class DestinationModule {}
