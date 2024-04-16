"use client";
import { AddDialog } from "@/components/admins/add-dialog";
import { Admin, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function UsersPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/admins`);
      return res.json();
    },
  });

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
        data={data?.data ? data?.data : []}
        addDialog={<AddDialog />}
      />
    </div>
  );
}
