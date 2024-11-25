import Elysia from "elysia";
import { PresignedUrlQueryType } from "src/model/bucket";
import { logger } from "src/utils";
import { authPlugin, AuthPluginProps } from "./auth";
import { bucketService } from "src/service";

export const bucketPlugin = () => {
  logger.info("Setting up bucket plugin");

  return new Elysia({
    prefix: "/bucket",
  })
    .onBeforeHandle(({ cookie, set }) =>
      authPlugin({ cookie, set: set as AuthPluginProps["set"] }),
    )
    .get(
      "presigned-url",
      async ({ query, set }) => {
        const { fileName, fileType } = query;
        try {
          const { presignedUrl, fetchUrl } =
            (await bucketService.getPresignedUrl(fileName, fileType)) ?? {};
          if (!presignedUrl) throw new Error("No presigned url returned");
          if (!fetchUrl) throw new Error("No fetch url returned");

          set.status = 200;

          return {
            presignedUrl,
            fetchUrl,
          };
        } catch (error) {
          set.status = 500;

          const errMessage = "💀 Failed to get presigned url:";
          logger.error(errMessage, error as Error);

          return errMessage;
        }
      },
      {
        query: PresignedUrlQueryType,
      },
    );
};
