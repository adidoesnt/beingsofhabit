import { ColumnDef } from "@tanstack/react-table";

// TODO: move types to packages
export type Post = {
  id: string;
  title: string;
  blurb: string;
  content: string;
  category: string;
  headerImageURL: string;
  author: string;
  releaseDate: Date;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
