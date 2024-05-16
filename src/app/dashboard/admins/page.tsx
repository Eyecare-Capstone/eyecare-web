"use client";
import { AddDialog } from "@/components/dashboard/admins/add-dialog";
import { columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import loadingImg from "../../../../public/loading.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteCookie, getToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { storeTokenCookies } from "@/lib/utils";

export default function AdminsPage() {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const router = useRouter();
  const [isEnable, setIsEnable] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken, refreshToken } = (await getToken()) || {};
      setAccessTokenData(accessToken!);
      setRefreshTokenData(refreshToken!);
      setIsEnable(true);
    };

    fetchToken();
  }, []);

  const queryClient = useQueryClient();

  useEffect(() => {}, []);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin"],
    enabled: isEnable,
    queryFn: async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const res = await axios
          .get(`${adminApi}/admins`, {
            headers: {
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);

        await storeTokenCookies(res.token);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const { status, message, token } = axiosError.response?.data;
          console.log(status);
          if (status == 401) {
            await deleteCookie("admin_data");
            await deleteCookie("access_token");
            await deleteCookie("refresh_token");
            router.push(`/auth?status=${status}&message=${message}"`);
          }
          await storeTokenCookies(token);
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
