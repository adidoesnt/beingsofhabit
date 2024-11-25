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
 * Base error class for Beings of Habit Admin Portal.
 */
export class AdminPortalError extends BeingsOfHabitError {
    constructor(
        message: AdminPortalAuthErrorMessage | AdminPortalPostErrorMessage,
        status?: Status
    ) {
        super(message, status);
        this.name = "AdminPortalError";
    }
}

// Admin Portal Auth Errors
export enum AdminPortalAuthErrorMessage {
    USER_NOT_FOUND = "User not found",
    INCORRECT_PASSWORD = "Incorrect password",
}

/**
 * Auth error class for Beings of Habit Admin Portal.
 */
export class AdminPortalAuthError extends AdminPortalError {
    constructor(message: AdminPortalAuthErrorMessage, status?: number) {
        super(message, status);
        this.name = "AuthError";
    }
}

// Admin Portal Post Errors
export enum AdminPortalPostErrorMessage {
    POST_NOT_FOUND = "Post not found",
    INCORRECT_PASSWORD = "Incorrect password",
    UPDATE_FAILED = "Failed to update post",
    CREATE_FAILED = "Failed to create post",
}

/**
 * Post error class for Beings of Habit Admin Portal.
 */
export class AdminPortalPostError extends AdminPortalError {
    constructor(message: AdminPortalPostErrorMessage, status?: number) {
        super(message, status);
        this.name = "PostError";
    }
}
