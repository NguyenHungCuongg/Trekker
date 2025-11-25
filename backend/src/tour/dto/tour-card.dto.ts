import { IsNumber, IsString } from "class-validator";

export class TourCardDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  rating: number;

  @IsString()
  location: string;

  @IsString()
  image: string;

  constructor(
    id: number,
    name: string,
    price: number,
    rating: number,
    location: string,
    image: string,
  ) {
    Object.assign(this, {
      id,
      name,
      price,
      rating,
      location,
      image,
    });
  }
}
