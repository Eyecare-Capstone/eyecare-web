"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { deleteCookie } from "@/lib/actions";

export default function AuthPage() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      axios.defaults.withCredentials = true;
      const baseApi = process.env.NEXT_PUBLIC_BASE_API;
      const res = await axios
        .get(`${baseApi}/auth`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => res.data);
      router.push(res.url);
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
      } else {
        console.log("Unknown Error:", error);
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const statusQuery = searchParams.get("status");
    const messageQuery = searchParams.get("message");
    setStatus(statusQuery);
    if (messageQuery) {
      setMessage(messageQuery);
    } else {
      setMessage(
        "Sorry, you have been redirected because you are not authorized."
      );
    }
  }, []);

  useEffect(() => {
    if (status && message) {
      if (status == "200") {
        toast({
          title: `${getStatusText(status)} : ${status}`,
          description: `${message}`,
          action: (
            <ToastAction altText="go" className="bg-blue-950 w-1/2 p-5">
              <Link href={`/`} className="text-sm">
                Go to landing page
              </Link>
            </ToastAction>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: `${getStatusText(status)} : ${status}`,
          description: `${message}`,
          action: (
            <ToastAction altText="go" className="bg-black w-1/2 p-5">
              <Link href={`/`} className="text-sm">
                Go to landing page
              </Link>
            </ToastAction>
          ),
        });
      }
    }
  }, [status, message]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        onClick={handleClick}
        variant="secondary"
        className="px-6 py-8 flex justify-center items-center gap-1 hover:brightness-90 hover:scale-105 transform transition-transform duration-300 "
      >
        <FcGoogle size={36} />
        <p className="font-bold text-base text">Continue with Google</p>
      </Button>
    </div>
  );
}
