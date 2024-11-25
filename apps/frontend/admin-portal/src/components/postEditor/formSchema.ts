import { Category } from "@/packages/types/post";
import { z } from "zod";

export const formSchema = z.object({
  headerImage: z.any().refine((fileList) => {
    if (!fileList) return true;
    fileList instanceof FileList;
    return fileList.length === 1;
  }),
  title: z.string().min(3),
  blurb: z.string().min(10),
  content: z.string().min(50),
  releaseDate: z.date().min(new Date()),
  category: z.nativeEnum(Category),
});
