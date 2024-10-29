import bcrypt from "bcryptjs";
import { userRepository } from "../repository";
import { generateToken, getUserFromToken } from "../utils/jwt";
import { logger } from "src/utils";
import { BlogPortalAuthErrorMessage } from "@/packages/types/error";

export const findByUsername = async (username: string) => {
  logger.debug("User service::Find user by username", username);

  const user = await userRepository.findOne({ username });

  return user;
};

export const findByToken = async (token: string) => {
  logger.debug("User service::Find user by token", token);

  const user = getUserFromToken(token);
  const { username } = user;

  logger.debug("User service::Find user by username", username);

  const userFromDb = await findByUsername(username);

  return userFromDb;
};

export const login = async (username: string, password: string) => {
  logger.debug("User service::Login", username);

  const user = await userRepository.findOne({ username });
  if (!user) {
    logger.warn("User service::Login - User not found");

    return {
      user: null,
      token: null,
      errMessage: BlogPortalAuthErrorMessage.USER_NOT_FOUND,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    logger.warn("User service::Login - Incorrect password");

    return {
      user,
      token: null,
      errMessage: BlogPortalAuthErrorMessage.INCORRECT_PASSWORD,
    };
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};
