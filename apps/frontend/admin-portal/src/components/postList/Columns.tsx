import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Category, Post } from "@/packages/types/post";
import { Badge } from "../ui/badge";
import { toFirstLetterUppercase } from "@/packages/utils/string";

enum ReleaseStatus {
  DRAFT = "draft",
  RELEASED = "released",
  DELETED = "deleted",
}

const CategoryBadgeColourMap: Record<Category, string> = {
  [Category.STRENGTHENING]: "bg-blue-600",
  [Category.FUELLING]: "bg-green-800",
  [Category.HEALING]: "bg-yellow-600",
  [Category.LEARNING]: "bg-purple-600",
  [Category.MISC]: "bg-gray-600",
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        className="underline text-blue-600"
        to={`/posts/${row.original._id}`}
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <Badge className={CategoryBadgeColourMap[category]}>
          {toFirstLetterUppercase(category)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ row }) => {
      const date = new Date(row.original.releaseDate);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isDeleted = row.original.isDeleted;
      if (isDeleted)
        return (
          <Badge className="bg-red-600">
            {toFirstLetterUppercase(ReleaseStatus.DELETED)}
          </Badge>
        );

      const date = new Date(row.original.releaseDate);
      if (date > new Date())
        return (
          <Badge className="bg-yellow-600">
            {toFirstLetterUppercase(ReleaseStatus.DRAFT)}
          </Badge>
        );

      return (
        <Badge className="bg-green-800">
          {toFirstLetterUppercase(ReleaseStatus.RELEASED)}
        </Badge>
      );
    },
  },
];
