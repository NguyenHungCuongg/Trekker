import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import toStream from "buffer-to-stream";

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = "trekker/profiles",
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file?.buffer) {
      throw new BadRequestException("File upload bị thiếu hoặc rỗng");
    }

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error", error);
            return reject(
              new BadRequestException(
                error.message ?? "Xảy ra lỗi khi upload lên Cloudinary",
              ),
            );
          }
          if (result) return resolve(result);
          return reject(
            new InternalServerErrorException(
              "Không nhận được phản hồi từ Cloudinary",
            ),
          );
        },
      );

      upload.on("error", (streamError) => {
        console.error("Upload stream error", streamError);
        reject(new BadRequestException("Không thể đọc dữ liệu file để upload"));
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(new Error("Xóa ảnh từ Cloudinary thất bại"));
        resolve(result);
      });
    });
  }

  extractPublicId(imageUrl: string): string {
    const parts = imageUrl.split("/");
    const fileWithExtension = parts[parts.length - 1];
    const publicId = fileWithExtension.split(".")[0];
    const folder = parts.slice(-2, -1)[0];
    return `${folder}/${publicId}`;
  }
}
