import { IsNotEmpty } from "class-validator";

export class UploadProfileImageDto {
  @IsNotEmpty()
  file: Express.Multer.File;
}
