import { verify } from "jsonwebtoken";
import { User } from "../model";

export const verifyToken = (token: string) => {
  const { JWT_SECRET = "DUMMY-SECRET" } = process.env;
  try {
    const { username } = (verify(token, JWT_SECRET) ?? {}) as User;
    return !!username;
  } catch (error) {
    console.error("💀 Failed to verify token:", error);
    return false;
  }
};
