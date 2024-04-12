"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MdMoreHoriz } from "react-icons/md";
import { MdCopyAll } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type Doctor = {
  id: String;
  name: String;
  picture: String;
  long: String;
  lat: String;
  address: string;
  star: number;
  schedule: string;
};

export const columns: ColumnDef<Doctor>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const { index } = row;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Doctor ID",
    cell: ({ row }) => (
      <div className="w-28 truncate relative ">
        <div
          className="max-h-20 "
          onClick={(e) => {
            e.stopPropagation();
            const element = e.currentTarget;
            const isOverflowing = element.classList.contains("overflow-y-auto");
            if (isOverflowing) {
              element.classList.remove("overflow-y-auto");
            } else {
              element.classList.add("overflow-y-auto");
            }
          }}
        >
          <span className="block">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => (
      <div className="w-28 truncate relative">
        <div
          className="max-h-20 "
          onClick={(e) => {
            e.stopPropagation();
            const element = e.currentTarget;
            const isOverflowing = element.classList.contains("overflow-y-auto");
            if (isOverflowing) {
              element.classList.remove("overflow-y-auto");
            } else {
              element.classList.add("overflow-y-auto");
            }
          }}
        >
          <span className="block">{row.original.picture}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "long",
    header: "Long",
  },
  {
    accessorKey: "lat",
    header: "Lat",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="w-28 truncate relative">
        <div
          className="max-h-20"
          onClick={(e) => {
            e.stopPropagation();
            const element = e.currentTarget;
            const isOverflowing = element.classList.contains("overflow-y-auto");
            if (isOverflowing) {
              element.classList.remove("overflow-y-auto");
            } else {
              element.classList.add("overflow-y-auto");
            }
          }}
        >
          <span className="block">{row.original.address}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "star",
    header: "Star",
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="w-28 truncate relative">
        <div
          className="max-h-20 "
          onClick={(e) => {
            e.stopPropagation();
            const element = e.currentTarget;
            const isOverflowing = element.classList.contains("overflow-y-auto");
            if (isOverflowing) {
              element.classList.remove("overflow-y-auto");
            } else {
              element.classList.add("overflow-y-auto");
            }
          }}
        >
          <span className="block">{row.original.schedule}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MdMoreHoriz className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id as string)}
              className="gap-1"
            >
              Copy Doctor ID
              <MdCopyAll />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-1">
              <CiEdit className="text-ring text-xl " />
              <span className="text-xs">Edit user</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-1">
              <MdOutlineDeleteForever className="text-red-500 text-xl " />
              <span className="text-xs">Delete user</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
