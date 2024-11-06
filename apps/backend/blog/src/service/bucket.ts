import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "src/utils";

const {
    NODE_ENV = "PROD",
    AWS_ACCESS_KEY_ID = "DUMMY-KEY",
    AWS_SECRET_ACCESS_KEY = "DUMMY-SECRET",
    AWS_REGION = "ap-southeast-1",
    BUCKET_ENDPOINT = "DUMMY-ENDPOINT",
    BUCKET_NAME = "DUMMY-BUCKET",
    URL_EXPIRY_IN_SECONDS = "120",
} = process.env;

const bucketEndpoint = NODE_ENV === "DEV" ? BUCKET_ENDPOINT : undefined;

const s3 = new S3Client({
    region: AWS_REGION,
    endpoint: bucketEndpoint,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

export const getPresignedUrl = async (fileName: string, fileType: string) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
    });

    try {
        logger.debug("Bucket service::Get presigned url", command);
        const presignedUrl = await getSignedUrl(s3, command, {
            expiresIn: Number(URL_EXPIRY_IN_SECONDS),
        });
        return presignedUrl;
    } catch (error) {
        logger.error("Failed to get presigned url", error as Error);
        return null;
    }
};
