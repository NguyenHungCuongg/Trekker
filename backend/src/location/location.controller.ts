import { Controller, Get, ParseIntPipe, Param } from "@nestjs/common";
import { LocationService } from "./location.service";
import { Location } from "./location.entity";

@Controller("locations")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }
}
