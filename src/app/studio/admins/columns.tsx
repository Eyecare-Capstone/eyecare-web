"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MdMoreHoriz } from "react-icons/md";
import { MdCopyAll } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteConfirmation } from "@/components/admins/delete-confirmation";
import { EditDialog } from "@/components/admins/edit-dialog";

export type Admin = {
  id: String;
  email: String;
};

export const columns: ColumnDef<Admin>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const { index } = row;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Admin ID",
  },
  {
    accessorKey: "email",
    header: "Email",
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
              <DeleteConfirmation id={admin.id as string} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
