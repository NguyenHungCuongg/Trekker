import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TourService } from "./tour.service";
import { Tour } from "./tour.entity";
import { SearchTourDto } from "./dto/search-tour.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";

@Controller("tours")
export class TourController {
  constructor(private tourService: TourService) {}

  // User endpoints
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

  // Admin endpoints
  @Get("admin/all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllTours(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findTourById(@Param("id", ParseIntPipe) id: number): Promise<Tour> {
    return this.tourService.findOne(id);
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createTour(@Body() createTourDto: Partial<Tour>): Promise<Tour> {
    return this.tourService.create(createTourDto);
  }

  @Put("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateTour(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTourDto: Partial<Tour>,
  ): Promise<Tour> {
    return this.tourService.update(id, updateTourDto);
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteTour(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.tourService.remove(id);
    return { message: "Tour đã được xóa thành công" };
  }
}
