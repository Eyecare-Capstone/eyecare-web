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
import { EditDialog } from "@/components/dashboard/clinics/edit-dialog";
import { DeleteDialog } from "@/components/dashboard/clinics/delete-dialog";

export type Clinic = {
  id: String;
  name: String;
  province: String;
  city: String;
  picture: String;
  lon: String;
  lat: String;
  address: string;
  star: number;
  schedule: string;
};

export const columns: ColumnDef<Clinic>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const { index } = row;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "clinicId",
    header: "Clinic ID",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-24"
        readOnly
        value={row.original.id as string}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-36 "
        readOnly
        value={row.original.name as string}
      />
    ),
  },
  {
    accessorKey: "province",
    header: "Province",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-20"
        readOnly
        value={row.original.province as string}
      />
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-20"
        readOnly
        value={row.original.city as string}
      />
    ),
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-32 "
        readOnly
        value={row.original.picture as string}
      />
    ),
  },
  {
    accessorKey: "lat",
    header: "Lat",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-24 "
        readOnly
        value={row.original.lat as string}
      />
    ),
  },
  {
    accessorKey: "lon",
    header: "Lon",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-24 "
        readOnly
        value={row.original.lon as string}
      />
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-36"
        readOnly
        value={row.original.address as string}
      />
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
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-36 "
        readOnly
        value={row.original.schedule as string}
      />
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
              Copy Clinic ID
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
