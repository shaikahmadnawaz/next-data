"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDownUp } from "lucide-react";
import UpdateData from "../update-data";
import DeleteData from "../delete-data";

export const DataTableColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        ID
        <ArrowDownUp className="w-4 h-4 ml-1" />
      </Button>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Name
        <ArrowDownUp className="w-4 h-4 ml-1" />
      </Button>
    ),
  },

  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Phone Number
        <ArrowDownUp className="w-4 h-4 ml-1" />
      </Button>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Email
        <ArrowDownUp className="w-4 h-4 ml-1" />
      </Button>
    ),
  },

  {
    accessorKey: "hobbies",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Hobbies
        <ArrowDownUp className="w-4 h-4 ml-1" />
      </Button>
    ),
  },

  {
    header: "Update",
    id: "update",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return <UpdateData data={data} />;
    },
  },

  {
    header: "Delete",
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return <DeleteData data={data} />;
    },
  },
];
