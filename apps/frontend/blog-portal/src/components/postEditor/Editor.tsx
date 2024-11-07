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
import { EditorFormDropdownField } from "./EditorFormDropdownField";
import { EditorFormCalendarField } from "./EditorFormCalendarField";
import { DeletePostButton } from "./DeletePostButton";
import { EditorFormImageField } from "./EditorFormImageField";

const { VITE_AUTOSAVE_INTERVAL = "60000" } = import.meta.env;
const autosaveInterval = Number(VITE_AUTOSAVE_INTERVAL);

enum FieldType {
    TEXT = "text",
    TEXT_AREA = "textarea",
    DATE = "date",
}

const fields = [
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

export const Editor = ({ post }: { post: Post }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(new Date());
    const navigate = useNavigate();
    const [filePreview, setFilePreview] = useState<string | null>(
        post.headerImageURL
    );

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            headerImage: post.headerImageURL,
            title: post.title,
            blurb: post.blurb,
            content: post.content,
            releaseDate: post.releaseDate,
            category: post.category,
        },
    });

    const handleBack = useCallback(() => {
        navigate({
            to: "/posts",
        });
    }, []);

    const getPresignedUrl = useCallback(async (file: File) => {
        const query = new URLSearchParams({
            fileName: file.name,
            fileType: file.type,
        }).toString();
        const presignedUrl = await apiClient.get(
            `/bucket/presigned-url?${query}`
        );
        return presignedUrl;
    }, []);

    const uploadImage = useCallback(
        async (file: File, presignedUrl: string) => {
            const response = await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });
            if (!response.ok) throw new Error("Failed to upload image");
        },
        []
    );

    const handleImageUpload = useCallback(async (file: File) => {
        try {
            const response = await getPresignedUrl(file);
            const presignedUrl = response.data;
            if (!presignedUrl) throw new Error("No presigned url returned");

            await uploadImage(file, presignedUrl);
            return presignedUrl;
        } catch (error) {
            console.error("Failed to upload image to s3", error);
        }
    }, [getPresignedUrl, uploadImage]);

    const savePost = useCallback(
        async (formData: z.infer<typeof formSchema>) => {
            setIsSaving(true);
            try {
                const presignedUrl = await handleImageUpload(
                    formData.headerImage[0]
                );
                const {
                    headerImage: _headerImage,
                    ...formDataWithoutHeaderImage
                } = formData;
                const { data } = await apiClient.put(`/posts/${post._id}`, {
                    ...formDataWithoutHeaderImage,
                    headerImageURL: presignedUrl,
                });
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
        [post, setIsSaving, handleImageUpload]
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
    const { headerImage, title, blurb, content, releaseDate } = formValues;

    useEffect(() => {
        const file = headerImage?.[0];
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(post.headerImageURL ?? null);
        }
    }, [headerImage, setFilePreview, post.headerImageURL]);

    useEffect(() => {
        if (!post) return;
        const interval = setInterval(
            savePost.bind(null, formValues),
            autosaveInterval
        );

        return () => clearInterval(interval);
    }, [savePost, post, formValues]);

    return (
        <div className="grid place-items-center rounded-md bg-gray-500 p-2 max-h-[80dvh] w-full overflow-y-clip m-4">
            <div className="grid md:grid-cols-2 bg-gray-500 rounded-md max-h-[70dvh] w-full overflow-y-auto m-2">
                <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black m-4 min-w-1/2 max-w-1/2">
                    <Button
                        onClick={handleBack}
                        className="w-fit bg-gray-300 text-black"
                    >
                        Back
                    </Button>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(savePost)}
                            className="space-y-8"
                        >
                            <EditorFormDropdownField
                                key={"category"}
                                form={form}
                                label="Category"
                                name="category"
                                prompt="Select the category of the post."
                            />
                            <EditorFormImageField
                                key={"headerImage"}
                                form={form}
                                label="Header Image"
                                name="headerImage"
                                prompt="Please upload the header image of the post."
                            />
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
                            <EditorFormCalendarField
                                key={"releaseDate"}
                                form={form}
                                label="Release Date"
                                name="releaseDate"
                                prompt="Choose the date of release"
                                initialValue={releaseDate}
                            />
                            <div className="flex items-center gap-4">
                                <DeletePostButton
                                    postId={post._id!}
                                    isDeleted={post.isDeleted}
                                />
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
                <div className="hidden md:flex flex-col gap-4 rounded-md border p-4 bg-white text-black m-4 min-w-1/2 max-w-[1/2]">
                    {filePreview && (
                        <img
                            src={filePreview}
                            alt="Header Image"
                            className="aspect-video object-cover"
                        />
                    )}
                    <h1 className="text-left text-2xl font-bold">{title}</h1>
                    <p className="text-left text-md italic">
                        {releaseDate.toLocaleDateString()}
                    </p>
                    <p className="text-left text-md italic">{blurb}</p>
                    <ReactMarkdown components={reactMarkdownComponents}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
