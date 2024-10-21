import { Elysia } from "elysia";
import { verifyToken } from "../utils/jwt";
import { Status } from "../constants";

export const authPlugin = () => {
  console.log("Setting up auth plugin");

  return new Elysia().onBeforeHandle(({ request, set }) => {
    const token = request.headers.get("Authorization");
    if (!token) return;

    try {
      const isValid = verifyToken(token);
      if (!isValid) throw new Error("Invalid token");
    } catch (error) {
      set.status = Status.UNAUTHORIZED;
      return;
    }
  });
};
