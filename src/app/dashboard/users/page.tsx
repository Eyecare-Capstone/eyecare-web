"use client";
import { AddDialog } from "@/components/dashboard/users/add-dialog";
import { columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import loadingImg from "../../../../public/loading.svg";
import Image from "next/image";
import { deleteCookie, getToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { filterUsersData, storeTokenCookies } from "@/lib/utils";

export default function UsersPage() {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const router = useRouter();
  const [isEnable, setIsEnable] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");
  const [status, setStatus] = useState<any>("all");

  useEffect(() => {
    const fetcData = async () => {
      if (typeof window !== "undefined") {
        const statusData = localStorage.getItem("status");
        setStatus(statusData ? statusData : "all");
      }
      const { accessToken, refreshToken } = (await getToken()) || {};
      setAccessTokenData(accessToken!);
      setRefreshTokenData(refreshToken!);
      setIsEnable(true);
    };

    fetcData();
  }, []);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<any>({
    queryKey: ["user"],
    enabled: isEnable,
    queryFn: async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios
          .get(`${adminApi}/users`, {
            headers: {
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        await storeTokenCookies(res.token);
        // console.log(status);
        if (status !== "all") {
          const data = await filterUsersData(res.data, status);
          return data;
        }
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res = axiosError.response?.data;
          console.log(res);
          if (res?.status == 401) {
            await deleteCookie("admin_data");
            await deleteCookie("access_token");
            await deleteCookie("refresh_token");
            router.push(`/auth?status=${res?.status}&message=${res?.message}"`);
          }
          await storeTokenCookies(res.token);
          return [];
        } else {
          console.log("Unknown Error:", error);
          return [];
        }
      }
    },
  });

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["user"] });
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
