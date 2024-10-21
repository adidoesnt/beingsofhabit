import { RootFilterQuery } from "mongoose";
import { User, UserModel } from "../model";

export const findOne = (findOptions?: RootFilterQuery<User>) => {
  if (findOptions) {
    return UserModel.findOne(findOptions);
  }
  return UserModel.findOne();
};
