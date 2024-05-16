"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { storeTokenCookies } from "@/lib/utils";
import { getToken } from "@/lib/actions";

export default function AdminsPage() {
  const queryClient = useQueryClient();
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

  const { data, isLoading } = useQuery<any>({
    queryKey: ["halo"],
    enabled: isEnable,
    queryFn: async () => {
      try {
        const res = await axios
          .get(`http://localhost:3001/coba`, {
            headers: {
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        console.log(res);

        // await storeTokenCookies(res.token);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res = axiosError.response?.data;
          console.log(res);
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
        <h1 className="text-2xl font-bold mt-3">loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-3 h-screen">
      <h1>halo</h1>
    </div>
  );
}
