"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MdMoreHoriz } from "react-icons/md";
import { MdCopyAll } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/dashboard/users/edit-dialog";
import { DeleteDialog } from "@/components/dashboard/users/delete-dialog";
import { IoIosRadioButtonOn } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type User = {
  id: String;
  username: String;
  email: String;
  avatar: String | undefined;
  status: String | any;
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
      <input
        className=" text-white bg-background group-hover:bg-background/10 w-32"
        readOnly
        value={row.original.avatar as string}
      />
    ),
  },
  {
    accessorKey: "status",
    header: () => {
      let status = "all";
      if (typeof window !== "undefined") {
        const storedStatus = localStorage.getItem("status");
        status = storedStatus ? storedStatus : "all";
      }

      return (
        <Select
          defaultValue={status ? status : "all"}
          onValueChange={(value) => {
            localStorage.setItem("status", value);
            window.location.reload();
          }}
        >
          <SelectTrigger className="w-28 border-0">
            <SelectValue placeholder="Select status..." />
          </SelectTrigger>
          <SelectContent className="w-24">
            <SelectGroup>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="deactive">Deactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          className="capitalize text-xs rounded-md w-28 justify-start gap-1 items-center flex flex-row"
          variant="outline"
        >
          <IoIosRadioButtonOn
            className={`${
              user.status == "active" ? "text-green-500" : "text-red-500"
            } `}
          />
          {row.getValue("status")}
        </Button>
      );
    },
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
              <MdMoreHoriz className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id as string)}
              className="gap-1"
            >
              Copy User ID
              <MdCopyAll />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="gap-1">
              <EditDialog id={user.id as string} />
            </DropdownMenuLabel>
            <DropdownMenuLabel className="gap-1">
              <DeleteDialog id={user.id as string} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
