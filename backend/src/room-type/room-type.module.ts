import { Module } from "@nestjs/common";
import { RoomTypeService } from "./room-type.service";
import { RoomTypeController } from "./room-type.controller";

@Module({
  providers: [RoomTypeService],
  controllers: [RoomTypeController],
})
export class RoomTypeModule {}
