import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/packages/types/post";

// TODO: format releaseDate to make it human readable
export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <Link className="underline text-blue-600" to={`/posts/${row.original._id}`}>
                {row.original.title}
            </Link>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "releaseDate",
        header: "Date",
    },
];
