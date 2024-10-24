import { prop } from "@typegoose/typegoose";

export enum Category {
    STRENGTHENING = "strengthening",
    FUELLING = "fuelling",
    HEALING = "healing",
    LEARNING = "learning",
    MISC = "miscellaneous"
}

export class Post {
    declare _id?: string;

    @prop({ required: true, type: String })
    declare title: string;

    @prop({ required: true, type: String })
    declare blurb: string;

    @prop({ required: true, type: String })
    declare content: string;

    @prop({ required: true, type: String })
    declare category: Category;

    @prop({ required: true, type: String })
    declare headerImageURL: string;

    @prop({ required: true, type: String })
    declare author: string;

    @prop({ required: true, type: Date })
    declare releaseDate: Date;

    @prop({ required: false, type: Boolean, default: false })
    declare isDeleted?: boolean;
}
