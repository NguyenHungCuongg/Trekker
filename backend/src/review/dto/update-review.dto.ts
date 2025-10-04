import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { ServiceType } from "src/common/enums";

export class UpdateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
