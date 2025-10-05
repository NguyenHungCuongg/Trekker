import { IsOptional, IsNumber, IsString, Min, Max } from "class-validator";

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
