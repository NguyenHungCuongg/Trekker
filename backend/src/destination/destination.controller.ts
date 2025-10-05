import { Controller, ParseIntPipe, Query, Get, Param } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { Destination } from "./destination.entity";

@Controller("destinations")
export class DestinationController {
  constructor(private destinationService: DestinationService) {}

  @Get()
  async findAll(
    @Query("locationId", ParseIntPipe) locationId?: number,
  ): Promise<Destination[]> {
    if (locationId) {
      return this.destinationService.findByLocationId(locationId);
    }
    return this.destinationService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Destination> {
    return this.destinationService.findOne(id);
  }
}
