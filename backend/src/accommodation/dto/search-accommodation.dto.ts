import { IsOptional, IsNumber, IsString, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class SearchAccommodationDto {
  @IsOptional()
  @IsNumber()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  destinationId?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  minRating?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number;
}
