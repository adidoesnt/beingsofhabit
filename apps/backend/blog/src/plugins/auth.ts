import { Cookie } from "elysia";
import { Status } from "../constants";
import { verifyToken } from "../utils/jwt";

export type AuthPluginProps = {
  cookie: Record<string, Cookie<string | undefined>>;
  set: {
    status: number;
  };
};

export const authPlugin = async ({ cookie, set }: AuthPluginProps) => {
  const token = cookie.token.value;
  console.log("Token:", token);

  if (!token) {
    set.status = Status.UNAUTHORIZED;

    const errMessage = "No token provided";
    console.error(errMessage);

    return errMessage;
  }

  const isValid = await verifyToken(token);
  if (!isValid) {
    set.status = Status.FORBIDDEN;

    const errMessage = "Invalid token";
    console.error(errMessage);

    return errMessage;
  }
};
