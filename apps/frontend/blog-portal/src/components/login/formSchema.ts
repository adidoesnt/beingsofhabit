import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(8),
  password: z.string().min(8),
});
