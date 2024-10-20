import { getModelForClass, prop } from "@typegoose/typegoose";

export enum Category {
  FITNESS = "fitness",
  NUTRITION = "nutrition",
  WELLBEING = "wellbeing & self-care",
  LEARNING = "learning",
}

export class Post {
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
}

export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    collection: "posts",
    timestamps: true,
    _id: true,
  },
});
