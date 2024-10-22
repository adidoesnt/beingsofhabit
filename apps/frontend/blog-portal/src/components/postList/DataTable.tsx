import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  type Header as HeaderType,
  type Table as TableType,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostListHeader } from "./PostListHeader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const NoResults = ({ columns }: { columns: ColumnDef<any, any>[] }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

const Header = ({ table }: { table: TableType<any> }) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return <Head key={header.id} header={header} />;
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

const Head = ({ header }: { header: HeaderType<any, any> }) => {
  return (
    <TableHead key={header.id} className="text-center">
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
};

const Body = ({ table, columns }: { table: TableType<any>; columns: any }) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <NoResults columns={columns} />
      )}
    </TableBody>
  );
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4 bg-white text-black text-center m-8 min-w-[50dvw]">
      <PostListHeader />
      <Table>
        <Header table={table} />
        <Body table={table} columns={columns} />
      </Table>
    </div>
  );
}
