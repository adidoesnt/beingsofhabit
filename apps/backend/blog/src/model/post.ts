import { t } from "elysia";
import { getModelForClass } from "@typegoose/typegoose";
import { Category, Post } from "@/packages/types/post";

export const GetPostQueryType = t.Object({
  releaseDate: t.Optional(t.String()),
  category: t.Optional(t.Enum(Category)),
  includeDeleted: t.Optional(t.String()),
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

export const UpdatePostBodyType = t.Object({
  title: t.Optional(t.String()),
  blurb: t.Optional(t.String()),
  content: t.Optional(t.String()),
  category: t.Optional(t.Enum(Category)),
  headerImageURL: t.Optional(t.String()),
  releaseDate: t.Optional(t.Date()),
  isDeleted: t.Optional(t.Boolean()),
});

export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    collection: "posts",
    timestamps: true,
    _id: true,
  },
});
