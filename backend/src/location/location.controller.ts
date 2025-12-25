import { Controller, Get, ParseIntPipe, Param, Query } from "@nestjs/common";
import { LocationService } from "./location.service";
import { Location } from "./location.entity";
import { LocationCardDto } from "./dto/location-card.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("locations")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách tất cả các địa điểm" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các địa điểm.",
    type: [Location],
  })
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get("top")
  @ApiOperation({ summary: "Lấy danh sách các địa điểm hàng đầu" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các địa điểm hàng đầu.",
    type: [LocationCardDto],
  })
  async findTopLocations(
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<LocationCardDto[]> {
    return this.locationService.findTopLocations(limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết địa điểm theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết địa điểm.",
    type: Location,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }
}
