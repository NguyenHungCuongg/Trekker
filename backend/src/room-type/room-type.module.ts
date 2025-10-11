import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomType } from "./room-type.entity";
import { RoomTypeService } from "./room-type.service";
import { RoomTypeController } from "./room-type.controller";

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypeService],
  controllers: [RoomTypeController],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
