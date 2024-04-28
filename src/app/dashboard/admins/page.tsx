"use client";
import { AddDialog } from "@/components/dashboard/admins/add-dialog";
import { columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import loadingImg from "../../../../public/loading.svg";
import Image from "next/image";
import { useEffect } from "react";
import { deleteCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function AdminsPage() {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin"],
    queryFn: async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios
          .get(`${adminApi}/admins`)
          .then((res) => res.data);

        if (res.status == 401) {
          await deleteCookie("admin_data");
          await deleteCookie("access_token");
          await deleteCookie("refresh_token");
          router.push(`/auth?status=${res.status}&message=${res.message}"`);
        }

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
          return [];
        } else {
          console.log("Unknown Error:", error);
          return [];
        }
      }
    },
  });

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["admin"] });
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <Image
          src={loadingImg}
          alt="loading image"
          className="w-56 py-2"
          priority
        />
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
