
import { Components } from "react-markdown";

export const reactMarkdownComponents: Partial<Components> = {
    h1: ({ node, ...props }) => (
        <h1 className="text-2xl font-bold text-wrap break-words" {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 className="text-lg font-semibold text-wrap break-words" {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 className="text-md font-medium text-wrap break-words" {...props} />
    ),
    h4: ({ node, ...props }) => (
        <h4 className="text-base font-medium text-wrap break-words" {...props} />
    ),
    h5: ({ node, ...props }) => (
        <h5 className="text-sm font-medium text-wrap break-words" {...props} />
    ),
    h6: ({ node, ...props }) => (
        <h6 className="text-xs font-medium text-wrap break-words" {...props} />
    ),
    p: ({ node, ...props }) => (
        <p className="text-base text-gray-700 text-wrap break-words" {...props} />
    ),
    ul: ({ node, ...props }) => (
        <ul className="list-disc ml-5 text-wrap break-words" {...props} />
    ),
    ol: ({ node, ...props }) => (
        <ol className="list-decimal ml-5 text-wrap break-words" {...props} />
    ),
    li: ({ node, ...props }) => (
        <li className="text-gray-600 text-wrap break-words" {...props} />
    ),
    img: ({ node, ...props }) => (
        <img className="max-w-full h-auto" {...props} alt="" />
    ),
    blockquote: ({ node, ...props }) => (
        <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
            {...props}
        />
    ),
};
