import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import toStream from "buffer-to-stream";

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = "trekker/profiles",
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
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
          if (error)
            return reject(new Error("Xảy ra lỗi khi upload lên Cloudinary"));
          if (result) return resolve(result);
          else reject(new Error("Xảy ra lỗi khi upload lên Cloudinary"));
        },
      );
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
