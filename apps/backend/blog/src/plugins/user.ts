import { Elysia, t } from "elysia";
import { userService } from "../service";
import { Status } from "../constants";

const { JWT_EXPIRY = "3600", NODE_ENV = "PROD" } = process.env;

export const userPlugin = () => {
  console.log("Setting up user plugin");

  return new Elysia({
    prefix: "/users",
  })
  .get("/me", async ({ cookie, set }) => {
    try {
      const token = cookie.token.value;

      // TODO: handle token expiry
      if (!token) {
        set.status = Status.UNAUTHORIZED;
        return "No token provided";
      }

      const user = await userService.findByToken(token);
      if (!user) throw new Error("No user returned");

      set.status = Status.OK;

      return user.toJSON();
    } catch (error) {
      set.status = Status.INTERNAL_SERVER_ERROR;

      const errMessage = "💀 Failed to get user:";
      console.error(errMessage, error);

      return errMessage;
    }
  })
  .post(
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

      return user.toJSON();
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      cookie: t.Optional(
        t.Object({
          token: t.Optional(t.String()),
        })
      ),
    }
  )
  .post("/logout", async ({ cookie, set }) => {
    try {
      cookie.token.value = "";
      cookie.token.httpOnly = true;
      cookie.token.secure = NODE_ENV !== "DEV";
      cookie.token.maxAge = 0;

      set.status = Status.OK;

      return "Logged out";
    } catch (error) {
      set.status = Status.INTERNAL_SERVER_ERROR;

      const errMessage = "💀 Failed to logout:";
      console.error(errMessage, error);

      return errMessage;
    }
  }, {
    cookie: t.Optional(
      t.Object({
        token: t.Optional(t.String()),
      })
    ),
  });
};
