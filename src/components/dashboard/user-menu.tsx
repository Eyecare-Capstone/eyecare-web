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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getRefreshToken, getSession } from "@/lib/actions";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";

interface Admin {
  name: string;
  picture?: string;
}

export const UserMenu = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const router = useRouter();
  const { toast } = useToast();

  const [admin, setAdmin] = useState<Admin>();

  useEffect(() => {
    const fetchData = async () => {
      const adminData = await getSession();

      setAdmin(adminData as Admin);
    };

    fetchData();
  }, []);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios
          .get(`${baseApi}/logout`)
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
    }
  };

  return (
    <div className="absolute left-0 bottom-2 w-full px-3 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start bg-muted hover:bg-muted/60 active:bg-primary"
          >
            <div className="flex justify-between items-center w-full ">
              <div className="flex gap-2">
                {admin?.picture ? (
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={`${admin.picture}`} />
                  </Avatar>
                ) : (
                  <RxAvatar size={20} />
                )}
                {admin ? <span>{admin.name}</span> : <span>NOT FOUND</span>}
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
