import { t } from "elysia";

export enum BucketFileType {
    JPEG = "image/jpeg",
    JPG = "image/jpg",
    PNG = "image/png",
    GIF = "image/gif",
    BMP = "image/bmp",
    TIFF = "image/tiff",
    WEBP = "image/webp",
    SVG = "image/svg+xml",
}

export const PresignedUrlQueryType = t.Object({
    fileName: t.String(),
    fileType: t.Enum(BucketFileType),
});