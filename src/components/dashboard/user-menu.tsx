"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getSession, getToken } from "@/lib/actions";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { Spinner } from "../common/spinner";
import Image from "next/image";
import { storeTokenCookies } from "@/lib/utils";

interface Admin {
  name: string;
  picture?: string;
}

export const UserMenu = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const router = useRouter();
  const { toast } = useToast();
  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken, refreshToken } = (await getToken()) || {};
      setAccessTokenData(accessToken!);
      setRefreshTokenData(refreshToken!);
    };

    fetchToken();
  }, []);

  const [admin, setAdmin] = useState("");

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      const { name, picture } = await getSession();
      setAdmin(name);
      setPictureUrl(picture);
      setLoading(true);
    };

    fetchData();
  }, []);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios
          .post(`${baseApi}/logout`, {
            headers: {
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          return axiosError.response?.data;
        } else {
          console.log("Unknown Error:", error);
        }
      }
    },
  });

  const handleLogout = async () => {
    setLoading(true);
    const res = await mutation.mutateAsync();

    if (!res) {
      console.log("Internal Server Error");
    }
    if (res.status == 401) {
      await deleteCookie("admin_data");
      await deleteCookie("access_token");
      await deleteCookie("refresh_token");
      router.push(`/auth?status=${res.status}&message=${res.message}"`);
    }

    if (res.status == 400 || res.status == 500) {
      router.push(`/dashboard?status=${res.status}&message=${res.message}"`);
      toast({
        variant: "destructive",
        title: `${getStatusText(res.status)} : ${res.status}`,
        description: `${res.message}`,
      });
    }

    if (res.status == 200) {
      await deleteCookie("admin_data");
      await deleteCookie("access_token");
      await deleteCookie("refresh_token");
      router.push(`/auth?status=${res.status}&message=${res.message}"`);
    } else {
      console.log(res);
      await deleteCookie("admin_data");
      await deleteCookie("access_token");
      await deleteCookie("refresh_token");
      router.push(`/auth?status=${res.status}&message=${res.message}"`);
    }
  };

  return (
    <div className="absolute left-0 bottom-2 w-full px-3 ">
      {loading && <Spinner />}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start bg-muted hover:bg-muted/60 active:bg-primary"
          >
            <div className="flex justify-between items-center w-full ">
              <div className="flex gap-2">
                {pictureUrl && !loading ? (
                  <Avatar className="h-5 w-5">
                    <Image
                      src={pictureUrl}
                      alt="picture"
                      width={50}
                      height={50}
                      className="w-auto h-auto"
                      priority
                    />
                  </Avatar>
                ) : (
                  <RxAvatar size={20} />
                )}
                {admin ? <span>{admin}</span> : <span>NOT FOUND</span>}
              </div>
              <TfiMoreAlt size={20} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
          <div className="space-y-1">
            <Button size="sm" className="w-full gap-1" onClick={handleLogout}>
              <HiOutlineLogout size={20} />
              Log Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
