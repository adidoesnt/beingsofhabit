import bcrypt from "bcrypt";
import { userRepository } from "../repository";
import { generateToken } from "../utils/jwt";

export const findByUsername = async (username: string) => {
  const user = await userRepository.findOne({ username });

  return user;
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
