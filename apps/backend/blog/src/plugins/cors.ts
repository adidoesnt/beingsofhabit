import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

export const corsPlugin = new Elysia().use(cors());
