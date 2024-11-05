import { RootFilterQuery } from "mongoose";
import { Token, TokenModel } from "src/model/token";
import { logger } from "src/utils";

export const findOne = async (findOptions?: RootFilterQuery<Token>) => {
        logger.debug("Token repository::Find token", findOptions);
        
        if (findOptions) {
            return await TokenModel.findOne(findOptions);
        }
        return await TokenModel.findOne();
};

export const createOne = async (token: Token) => {
    try {
        return await TokenModel.create(token);
    } catch (error) {
        logger.error("Failed to create token", error as Error);
    }
};