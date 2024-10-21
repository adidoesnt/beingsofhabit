import { userRepository } from "../repository";

export const findByUsername = async (username: string) => {
  const user = await userRepository.findOne({ username });

  return user;
};
