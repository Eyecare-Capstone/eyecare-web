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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type User = {
  id: String;
  username: String;
  email: String;
  avatar: String | undefined;
};
export const columns: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const { index } = row;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => (
      <div className="w-32 truncate relative ">
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

            const handleBlur = () => {
              element.classList.remove("overflow-y-auto");
              element.removeEventListener("blur", handleBlur);
            };
            element.addEventListener("blur", handleBlur);
          }}
        >
          <span className="block">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="w-32 truncate relative">
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

            const handleBlur = () => {
              element.classList.remove("overflow-y-auto");
              element.removeEventListener("blur", handleBlur);
            };
            element.addEventListener("blur", handleBlur);
          }}
        >
          <span className="block">{row.original.avatar}</span>
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
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id as string)}
              className="gap-1"
            >
              Copy User ID
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
