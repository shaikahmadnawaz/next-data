"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { RocketIcon } from "@radix-ui/react-icons";
import AddData from "../add-data";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const DataTable = ({ columns, data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
    },
  });

  const [isSending, setIsSending] = useState(false);

  const handleSendDataByEmail = async () => {
    const selectedRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => data[key]._id);

    if (selectedRows.length === 0) {
      console.error("No rows selected.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(
        "https://next-data-express-api.vercel.app/api/v1/data/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedRows }),
        }
      );
      if (response.ok) {
        toast.success("Email sent successfully.");
        console.log("Email sent successfully.");
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-x-2">
          <AddData />
          <Button onClick={handleSendDataByEmail}>
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending
              </>
            ) : (
              <>
                <RocketIcon className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default DataTable;
