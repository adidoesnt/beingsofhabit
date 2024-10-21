import { verify } from "jsonwebtoken";
import { User } from "../model";
import { userService } from "../service";

export const verifyToken = async (token: string | null) => {
  const { JWT_SECRET = "DUMMY-SECRET" } = process.env;
  try {
    if (!token) throw new Error("No token provided");
    const { username } = (verify(token, JWT_SECRET) ?? {}) as User;
    const user = await userService.findByUsername(username);

    if (!user) throw new Error("User not found");
    return true;
  } catch (e) {
    const error = e as Error;
    console.error("Failed to verify token:", error.message);
    return false;
  }
};
