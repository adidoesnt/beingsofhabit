import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
  @prop({ required: true, type: String, unique: true })
  declare username: string;

  @prop({ required: true, type: String })
  declare name: string;

  @prop({ required: true, type: String })
  declare passwordHash: string;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    collection: "users",
    timestamps: false,
    _id: false,
  },
});
