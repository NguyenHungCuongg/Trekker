import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";

export const CloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get<string>("cloudinary.cloudName"),
      api_key: configService.get<string>("cloudinary.apiKey"),
      api_secret: configService.get<string>("cloudinary.apiSecret"),
    });
  },
  inject: [ConfigService],
};
