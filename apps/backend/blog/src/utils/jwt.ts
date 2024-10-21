import { verify } from "jsonwebtoken";
import { User } from "../model";
import { userService } from "../service";

export const verifyToken = async (token: string) => {
  const { JWT_SECRET = "DUMMY-SECRET" } = process.env;
  try {
    const { username } = (verify(token, JWT_SECRET) ?? {}) as User;
    const user = await userService.findByUsername(username);

    if (!user) throw new Error("User not found");
    return true;
  } catch (error) {
    console.error("💀 Failed to verify token:", error);
    return false;
  }
};
