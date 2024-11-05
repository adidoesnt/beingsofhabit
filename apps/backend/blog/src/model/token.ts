import { getModelForClass, prop } from "@typegoose/typegoose";

export class Token {
    declare _id?: string;
    
    @prop({ required: true, type: String })
    declare token: string;
}

export const TokenModel = getModelForClass(Token, {
    schemaOptions: {
        collection: "tokens",
        timestamps: false,
        _id: true,
    },
});
