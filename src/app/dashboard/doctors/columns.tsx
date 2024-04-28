"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MdMoreHoriz } from "react-icons/md";
import { MdCopyAll } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/dashboard/doctors/edit-dialog";
import { DeleteDialog } from "@/components/dashboard/doctors/delete-dialog";

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
    accessorKey: "doctorId",
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
    accessorKey: "lon",
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
      const admin = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MdMoreHoriz className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(admin.id as string)}
              className="gap-1"
            >
              Copy Admin ID
              <MdCopyAll />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="gap-1">
              <EditDialog id={admin.id as string} />
            </DropdownMenuLabel>
            <DropdownMenuLabel className="gap-1">
              <DeleteDialog id={admin.id as string} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
