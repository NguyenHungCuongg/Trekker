import { Controller, Get, ParseIntPipe, Param, Query } from "@nestjs/common";
import { LocationService } from "./location.service";
import { Location } from "./location.entity";
import { LocationCardDto } from "./dto/location-card.dto";

@Controller("locations")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get("top")
  async findTopLocations(
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<LocationCardDto[]> {
    return this.locationService.findTopLocations(limit);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }
}
