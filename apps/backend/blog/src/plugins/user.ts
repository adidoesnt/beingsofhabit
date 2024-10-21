import { Elysia, t } from "elysia";
import { userService } from "../service";
import { Status } from "../constants";

const { JWT_EXPIRY = "3600", NODE_ENV = "PROD" } = process.env;

export const userPlugin = () => {
  console.log("Setting up user plugin");

  return new Elysia({
    prefix: "/users",
  }).post(
    "/login",
    async ({ body, set, cookie }) => {
      const { username, password } = body;
      const { user, token, errMessage } = await userService.login(
        username,
        password
      );

      if (!user) {
        set.status = Status.NOT_FOUND;
        return errMessage;
      }

      if (!token) {
        set.status = Status.FORBIDDEN;
        return errMessage;
      }

      set.status = Status.OK;

      cookie.token.value = token;
      cookie.token.httpOnly = true;
      cookie.token.secure = NODE_ENV !== "DEV";
      cookie.token.maxAge = Number(JWT_EXPIRY);

      return user;
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      cookie: t.Optional(
        t.Object({
          token: t.String(),
        })
      ),
    }
  );
};
