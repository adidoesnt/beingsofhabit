import { verify } from "jsonwebtoken";
import { User } from "../model";
import { userService } from "../service";
import jwt from "jsonwebtoken";

const { JWT_SECRET = "DUMMY-SECRET", JWT_EXPIRY = "3600" } = process.env;

export const verifyToken = async (token: string | null) => {
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

export const generateToken = (user: User) => {
  const { username } = user;
  const payload = { username };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: Number(JWT_EXPIRY),
  });
};
