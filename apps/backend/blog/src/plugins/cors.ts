import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const {
  NODE_ENV = "PROD",
  WEBSITE_URL = "DUMMY-URL",
  BLOG_PORTAL_URL = "DUMMY-URL",
  BLOG_URL = "DUMMY-URL",
} = process.env;

const originConfig =
  NODE_ENV === "DEV" ? undefined : [WEBSITE_URL, BLOG_PORTAL_URL, BLOG_URL];

export const corsPlugin = () => {
  const config = {
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
    origin: originConfig,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  console.log("Setting up CORS plugin with config:", config);

  return new Elysia().use(cors(config));
};
