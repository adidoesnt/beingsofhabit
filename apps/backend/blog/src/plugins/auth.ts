import { Status } from "../constants";
import { verifyToken } from "../utils/jwt";

export type AuthPluginProps = {
  request: Request;
  set: {
    status: number;
  };
};

export const authPlugin = async ({ request, set }: AuthPluginProps) => {
  const token = request.headers.get("Authorization");
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
