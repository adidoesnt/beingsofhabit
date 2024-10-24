import type { Status } from "./response";

export enum ErrorType {
    AUTH = "auth",
}

/**
 * Base error class for Beings of Habit.
 */
export class BeingsOfHabitError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
        this.name = "BeingsOfHabitError";
    }
}

/**
 * Base error class for Beings of Habit Blog Portal.
 */
export class BlogPortalError extends BeingsOfHabitError {
    constructor(
        message: BlogPortalAuthErrorMessage | BlogPortalPostErrorMessage,
        status?: Status
    ) {
        super(message, status);
        this.name = "BlogPortalError";
    }
}

// Blog Portal Auth Errors
export enum BlogPortalAuthErrorMessage {
    USER_NOT_FOUND = "User not found",
    INCORRECT_PASSWORD = "Incorrect password",
}

/**
 * Auth error class for Beings of Habit Blog Portal.
 */
export class BlogPortalAuthError extends BlogPortalError {
    constructor(message: BlogPortalAuthErrorMessage, status?: number) {
        super(message, status);
        this.name = "AuthError";
    }
}

// Blog Portal Post Errors
export enum BlogPortalPostErrorMessage {
    POST_NOT_FOUND = "Post not found",
    INCORRECT_PASSWORD = "Incorrect password",
    UPDATE_FAILED = "Failed to update post",
    CREATE_FAILED = "Failed to create post",
}

/**
 * Post error class for Beings of Habit Blog Portal.
 */
export class BlogPortalPostError extends BlogPortalError {
    constructor(message: BlogPortalPostErrorMessage, status?: number) {
        super(message, status);
        this.name = "PostError";
    }
}
