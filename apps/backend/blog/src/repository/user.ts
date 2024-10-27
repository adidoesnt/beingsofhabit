import { RootFilterQuery } from "mongoose";
import { User, UserModel } from "../model";
import { logger } from "src/utils";

export const findOne = (findOptions?: RootFilterQuery<User>) => {
  logger.debug("User repository::Find user", findOptions);

  if (findOptions) {
    return UserModel.findOne(findOptions);
  }
  return UserModel.findOne();
};
