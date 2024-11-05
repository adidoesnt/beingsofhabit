import { verify } from "jsonwebtoken";
import { User } from "../model";
import { tokenService, userService } from "../service";
import jwt from "jsonwebtoken";
import { logger } from "./logger";

const { JWT_SECRET = "DUMMY-SECRET", JWT_EXPIRY = "3600" } = process.env;

export const getUserFromToken = (token: string | null) => {
  if (!token) throw new Error("No token provided");
  const user = (verify(token, JWT_SECRET) ?? {}) as User;
  return user;
};

export const verifyToken = async (token: string | null) => {
  try {
    if (!token) throw new Error("No token provided");
   
    const { username } = getUserFromToken(token);
    const user = await userService.findByUsername(username);
    if (!user) throw new Error("User not found");

    const isUsed = await tokenService.isUsedToken(token);
    if (isUsed) throw new Error("Token already used");

    return true;
  } catch (e) {
    const error = e as Error;
    logger.error("Failed to verify token:", error);
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
