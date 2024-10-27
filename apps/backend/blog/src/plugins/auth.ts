import { Cookie } from "elysia";
import { Status } from "@/packages/types/response";
import { verifyToken } from "../utils/jwt";
import { logger } from "src/utils";

export type AuthPluginProps = {
  cookie: Record<string, Cookie<string | undefined>>;
  set: {
    status: number;
  };
};

export const authPlugin = async ({ cookie, set }: AuthPluginProps) => {
  const token = cookie.token.value;

  if (!token) {
    set.status = Status.UNAUTHORIZED;

    const errMessage = "No token provided";
    logger.error("Auth error", new Error(errMessage));

    return errMessage;
  }

  const isValid = await verifyToken(token);
  if (!isValid) {
    set.status = Status.FORBIDDEN;

    const errMessage = "Invalid token";
    logger.error("Auth error", new Error(errMessage));

    return errMessage;
  }
};
