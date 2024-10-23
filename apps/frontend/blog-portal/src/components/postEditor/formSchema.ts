import { z } from "zod";

export const formSchema = z.object({
    headerImageURL: z.string().url(),
    title: z.string().min(3),
    blurb: z.string().min(10),
    content: z.string().min(50),
});
