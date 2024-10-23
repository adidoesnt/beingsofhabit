import bcrypt from "bcrypt";
import { userRepository } from "../repository";
import { generateToken, getUserFromToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export const findByUsername = async (username: string) => {
  const user = await userRepository.findOne({ username });

  return user;
};

export const findByToken = async (token: string) => {
  const user = getUserFromToken(token);
  const { username } = user;
  const userFromDb = await findByUsername(username);

  return userFromDb;
};

export const login = async (username: string, password: string) => {
  const user = await userRepository.findOne({ username });
  if (!user) {
    return {
      user: null,
      token: null,
      errMessage: "User not found",
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return {
      user,
      token: null,
      errMessage: "Incorrect password",
    };
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};
