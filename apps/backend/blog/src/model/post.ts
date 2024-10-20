import { t } from "elysia";
import { getModelForClass, prop } from "@typegoose/typegoose";

export enum Category {
  FITNESS = "fitness",
  NUTRITION = "nutrition",
  WELLBEING = "wellbeing & self-care",
  LEARNING = "learning",
}

export const GetPostQueryType = t.Object({
  releaseDate: t.Date(),
  category: t.Optional(t.Enum(Category)),
});

export const CreatePostBodyType = t.Object({
  title: t.String(),
  blurb: t.String(),
  content: t.String(),
  category: t.Enum(Category),
  headerImageURL: t.String(),
  author: t.String(),
  releaseDate: t.Date(),
});

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
