import { Controller, ParseIntPipe, Query, Get, Param } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { Destination } from "./destination.entity";
import { DestinationCardDto } from "./dto/destination-card.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("destinations")
export class DestinationController {
  constructor(private destinationService: DestinationService) {}

  @Get()
  @ApiOperation({ summary: "Lấy tất cả điểm đến hoặc theo locationId" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách điểm đến.",
  })
  async findAll(
    @Query("locationId", ParseIntPipe) locationId?: number,
  ): Promise<Destination[]> {
    if (locationId) {
      return this.destinationService.findByLocationId(locationId);
    }
    return this.destinationService.findAll();
  }

  @Get("top")
  @ApiOperation({ summary: "Lấy các điểm đến hàng đầu" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các điểm đến hàng đầu.",
  })
  async findTopDestinations(
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<DestinationCardDto[]> {
    return this.destinationService.findTopDestinations(limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy điểm đến theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về điểm đến theo ID.",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Destination> {
    return this.destinationService.findOne(id);
  }
}
