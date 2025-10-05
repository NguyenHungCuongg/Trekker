import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { TourService } from "./tour.service";
import { Tour } from "./tour.entity";
import { SearchTourDto } from "./dto/search-tour.dto";

@Controller("tours")
export class TourController {
  constructor(private tourService: TourService) {}

  @Get()
  async findAll(
    @Query("locationId", ParseIntPipe) locationId: number,
  ): Promise<Tour[]> {
    if (locationId) {
      return this.tourService.findByLocationId(locationId);
    }
    return this.tourService.findAll();
  }

  @Get("search")
  async search(@Query() searchDto: SearchTourDto): Promise<Tour[]> {
    return this.tourService.search(searchDto);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Tour> {
    return this.tourService.findOne(id);
  }
}
