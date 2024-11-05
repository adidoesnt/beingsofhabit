import { tokenRepository } from "src/repository";
import { logger } from "src/utils";

export const isUsedToken = async (token: string) => {
    logger.debug("Token service::Is token used", token);

    const tokenFromDb = await tokenRepository.findOne({ token });

    return !!tokenFromDb;
};

export const markTokenAsUsed = async (token: string) => {
    await tokenRepository.createOne({ token });
};