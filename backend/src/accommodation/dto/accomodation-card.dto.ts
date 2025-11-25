import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class AccommodationCardDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  pricePerNight: number;

  @IsNumber()
  @Expose()
  rating: number;

  @IsString()
  @Expose()
  destination: string;

  @IsString()
  @Expose()
  image: string;

  constructor(
    id: number,
    name: string,
    pricePerNight: number,
    rating: number,
    location: string,
  ) {
    Object.assign(this, {
      id,
      name,
      pricePerNight,
      rating,
      location,
    });
  }
}
