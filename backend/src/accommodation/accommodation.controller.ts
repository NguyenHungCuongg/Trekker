import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AccommodationService } from "./accommodation.service";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";
@Controller("accommodations")
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Get()
  async findAll(
    @Query("locationId", ParseIntPipe) locationId?: number,
  ): Promise<Accommodation[]> {
    if (locationId) {
      return this.accommodationService.findByLocationId(locationId);
    }
    return this.accommodationService.findAll();
  }

  @Get("search")
  async search(
    @Query() searchDto: SearchAccommodationDto,
  ): Promise<Accommodation[]> {
    return this.accommodationService.search(searchDto);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Accommodation> {
    return this.accommodationService.findOne(id);
  }

  @Get(":id/room-types")
  async findRoomTypes(@Param("id", ParseIntPipe) id: number) {
    const accommodation = await this.accommodationService.findOne(id);
    return accommodation.roomTypes;
  }
}
