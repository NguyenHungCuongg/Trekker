import { Controller, ParseIntPipe, Query, Get, Param } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { Destination } from "./destination.entity";
import { DestinationCardDto } from "./dto/destination-card.dto";

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

  @Get("top")
  async findTopDestinations(
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<DestinationCardDto[]> {
    return this.destinationService.findTopDestinations(limit);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Destination> {
    return this.destinationService.findOne(id);
  }
}
