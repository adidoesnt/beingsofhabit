import { useCallback, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import { reactMarkdownComponents } from "./markdownComponents";
import { Post } from "../postList/Columns";

export const Editor = ({ post }: { post: Post }) => {
    const [headerImageURL, setHeaderImageURL] = useState("");
    const [content, setContent] = useState("");
    const [blurb, setBlurb] = useState("");
    const [title, setTitle] = useState("");
    // TODO: convert to form
    // TODO: add date picker for release date

    useEffect(() => {
        setHeaderImageURL(post.headerImageURL);
        setTitle(post.title);
        setBlurb(post.blurb);
        setContent(post.content);
    }, [post]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(event.target.value);
        },
        [setContent]
    );

    return (
        <div className="grid grid-cols-2 bg-gray-500 rounded-md">
            <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black text-center m-4 max-w-[45dvw]">
                <h1 className="text-center text-2xl font-bold">Edit Post</h1>
                <Input
                    placeholder="Header Image URL"
                    className="text-md"
                    value={headerImageURL}
                />
                <Input placeholder="Title" className="text-md" value={title} />
                <Input placeholder="Blurb" className="text-md" value={blurb} />
                <Textarea
                    placeholder="Write your post here..."
                    value={content}
                    onChange={handleChange}
                    className="min-w-[40dvw] max-w-[40dvw] min-h-[40dvh] max-h-[40dvh] text-md"
                />
                <Button className="w-fit">Save</Button>
            </div>
            <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black text-left m-4 max-w-[45dvw]">
                <img src={headerImageURL} alt="Header Image" />
                <h1 className="text-left text-2xl font-bold">{title}</h1>
                <p className="text-left text-md italic">{blurb}</p>
                <ReactMarkdown
                    components={reactMarkdownComponents}
                    className="min-w-[40dvw] max-w-[40dvw]"
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};
