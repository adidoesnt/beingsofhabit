
import { Components } from "react-markdown";

export const reactMarkdownComponents: Partial<Components> = {
    h1: ({ node, ...props }) => (
        <h1 className="text-3xl font-bold my-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 className="text-2xl font-semibold my-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 className="text-xl font-medium my-2" {...props} />
    ),
    h4: ({ node, ...props }) => (
        <h4 className="text-lg font-medium my-1" {...props} />
    ),
    h5: ({ node, ...props }) => (
        <h5 className="text-base font-medium" {...props} />
    ),
    h6: ({ node, ...props }) => (
        <h6 className="text-sm font-medium" {...props} />
    ),
    p: ({ node, ...props }) => (
        <p className="text-base text-gray-700 my-2" {...props} />
    ),
    ul: ({ node, ...props }) => (
        <ul className="list-disc ml-5 my-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
        <ol className="list-decimal ml-5 my-2" {...props} />
    ),
    li: ({ node, ...props }) => (
        <li className="text-gray-600 my-1" {...props} />
    ),
    img: ({ node, ...props }) => (
        <img className="max-w-full h-auto my-4" {...props} alt="" />
    ),
    blockquote: ({ node, ...props }) => (
        <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
            {...props}
        />
    ),
};
