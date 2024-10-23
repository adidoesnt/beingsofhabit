import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import { reactMarkdownComponents } from "./markdownComponents";
import { Post } from "@/packages/types/post";
import { formSchema } from "./formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "@/utils";
import { Form } from "../ui/form";
import { EditorFormTextField } from "./EditorFormTextField";
import { EditorFormTextAreaField } from "./EditorFormTextareaField";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";

const { VITE_AUTOSAVE_INTERVAL = "60000" } = import.meta.env;
const autosaveInterval = Number(VITE_AUTOSAVE_INTERVAL);

enum FieldType {
  TEXT = "text",
  TEXT_AREA = "textarea",
  DATE = "date",
}

const fields = [
  {
    name: "headerImageURL",
    label: "Header Image URL",
    placeholder: "https://picsum.photos/300/200",
    prompt: "Please enter the URL of the header image.",
    type: FieldType.TEXT,
  },
  {
    name: "title",
    label: "Title",
    placeholder: "My New Post!",
    prompt: "Please enter the title of your post.",
    type: FieldType.TEXT,
  },
  {
    name: "blurb",
    label: "Blurb",
    placeholder: "This is my new post.",
    prompt: "Please enter a short blurb for your post.",
    type: FieldType.TEXT_AREA,
    className: "min-h-[20dvh] max-h-[20dvh]",
  },
  {
    name: "content",
    label: "Content",
    placeholder: "This is my new post.",
    prompt: "Please enter your post content.",
    type: FieldType.TEXT_AREA,
    className: "min-h-[40dvh] max-h-[40dvh]",
  },
];

// TODO: add date picker for release date
// TODO: refactor component
export const Editor = ({ post }: { post: Post }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      headerImageURL: post.headerImageURL,
      title: post.title,
      blurb: post.blurb,
      content: post.content,
    },
  });

  const handleBack = useCallback(() => {
    navigate({
      to: "/posts",
    });
  }, []);

  const savePost = useCallback(
    async (formData: z.infer<typeof formSchema>) => {
      setIsSaving(true);
      try {
        const { data } = await apiClient.put(`/posts/${post._id}`, formData);
        if (!data) throw new Error("No post returned");
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to update post", error);
      }
      setIsSaving(false);
      await queryClient.invalidateQueries({
        queryKey: ["post", post._id],
      });
    },
    [post, setIsSaving]
  );

  const textFields = useMemo(
    () => fields.filter((field) => field.type === FieldType.TEXT),
    []
  );
  const textAreaFields = useMemo(
    () => fields.filter((field) => field.type === FieldType.TEXT_AREA),
    []
  );

  const formValues = form.watch();
  const { headerImageURL, title, blurb, content } = formValues;

  useEffect(() => {
    if (!post) return;
    const interval = setInterval(
      savePost.bind(null, formValues),
      autosaveInterval
    );

    return () => clearInterval(interval);
  }, [savePost, post]);

  return (
    <div className="grid grid-cols-2 bg-gray-500 rounded-md p-4 max-h-[80dvh] overflow-y-auto m-4">
      <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black m-4 min-w-1/2 max-w-[1/2]">
        <Button onClick={handleBack} className="w-fit bg-gray-300 text-black">
          Back
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(savePost)} className="space-y-8">
            {textFields.map((field) => (
              <EditorFormTextField
                key={field.name}
                form={form}
                label={field.label}
                placeholder={field.placeholder}
                prompt={field.prompt}
                name={field.name}
              />
            ))}
            {textAreaFields.map((field) => (
              <EditorFormTextAreaField
                key={field.name}
                form={form}
                label={field.label}
                placeholder={field.placeholder}
                prompt={field.prompt}
                name={field.name}
                className={field.className}
              />
            ))}
            <div className="flex items-center gap-4">
              <Button type="submit">Save</Button>
              <p className="text-xs text-gray-500">
                {isSaving
                  ? "Saving..."
                  : `Last saved at ${lastSaved.toLocaleTimeString()}`}
              </p>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black m-4 min-w-1/2 max-w-[1/2]">
        <img
          src={headerImageURL}
          alt="Header Image"
          className="aspect-video object-cover"
        />
        <h1 className="text-left text-2xl font-bold">{title}</h1>
        <p className="text-left text-md italic">{blurb}</p>
        <ReactMarkdown components={reactMarkdownComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
