import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { RoomTypeService } from "./room-type.service";
import { RoomType } from "./room-type.entity";

@Controller("room-type")
export class RoomTypeController {
  constructor(private roomTypeService: RoomTypeService) {}

  @Get()
  async findAll(
    @Query("accommodationId", ParseIntPipe) accommodationId?: number,
  ): Promise<RoomType[]> {
    if (accommodationId) {
      return this.roomTypeService.findByAccommodationId(accommodationId);
    }
    return this.roomTypeService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<RoomType> {
    return this.roomTypeService.findOne(id);
  }
}
