import { Elysia, t } from "elysia";
import { userService } from "../service";
import {
    BlogPortalAuthError,
    BlogPortalAuthErrorMessage,
} from "@/packages/types/error";
import { Status } from "@/packages/types/response";
import { logger } from "src/utils";

const { JWT_EXPIRY = "3600", NODE_ENV = "PROD" } = process.env;

export const userPlugin = () => {
    logger.info("Setting up user plugin");

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
                logger.error(errMessage, error as Error);

                return errMessage;
            }
        })
        .post(
            "/login",
            async ({ body, set, cookie }) => {
                try {
                    const { username, password } = body;
                    const { user, token, errMessage } = await userService.login(
                        username,
                        password
                    );

                    if (!user) {
                        throw new BlogPortalAuthError(
                            BlogPortalAuthErrorMessage.USER_NOT_FOUND,
                            Status.NOT_FOUND
                        );
                    }

                    if (!token) {
                        throw new BlogPortalAuthError(
                            BlogPortalAuthErrorMessage.INCORRECT_PASSWORD,
                            Status.FORBIDDEN
                        );
                    }

                    set.status = Status.OK;

                    cookie.token.value = token;
                    cookie.token.httpOnly = true;
                    cookie.token.secure = NODE_ENV !== "DEV";
                    cookie.token.maxAge = Number(JWT_EXPIRY);

                    return user.toJSON();
                } catch (e) {
                    const error = e as BlogPortalAuthError;
                    set.status = error.status ?? Status.INTERNAL_SERVER_ERROR;
                    return error.message;
                }
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
        .post(
            "/logout",
            async ({ cookie, set }) => {
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
                    logger.error(errMessage, error as Error);

                    return errMessage;
                }
            },
            {
                cookie: t.Optional(
                    t.Object({
                        token: t.Optional(t.String()),
                    })
                ),
            }
        );
};
