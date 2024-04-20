"use client";
import { AddDialog } from "@/components/admins/add-dialog";
import { Admin, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function UsersPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admins`).then((res) => res.data);
      return res.data;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["admin"] });
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-2xl font-bold mt-3">loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-3 h-screen">
      <DataTable
        columns={columns}
        data={data ? data : []}
        addDialog={<AddDialog />}
      />
    </div>
  );
}
