import { Elysia } from "elysia";

export const authPlugin = () => {
    console.log("Setting up auth plugin");

    return new Elysia();
};