import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { RoomTypeService } from "./room-type.service";
import { RoomType } from "./room-type.entity";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("room-types")
export class RoomTypeController {
  constructor(private roomTypeService: RoomTypeService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách tất cả các loại phòng" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các loại phòng.",
    type: [RoomType],
  })
  async findAll(
    @Query("accommodationId", ParseIntPipe) accommodationId?: number,
  ): Promise<RoomType[]> {
    if (accommodationId) {
      return this.roomTypeService.findByAccommodationId(accommodationId);
    }
    return this.roomTypeService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết loại phòng theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết loại phòng.",
    type: RoomType,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<RoomType> {
    return this.roomTypeService.findOne(id);
  }
}
