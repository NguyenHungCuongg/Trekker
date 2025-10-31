import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../../common/enums";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
