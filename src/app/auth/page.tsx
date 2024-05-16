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
import { storeAdminCookies, storeTokenCookies } from "@/lib/utils";
import { Spinner } from "@/components/common/spinner";

export default function AuthPage() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  }, [loading]);

  const handleClick = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios
        .get(`${baseApi}/auth`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .then((res) => res.data);
      console.log(res.url);
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

    const storeCookies = async (token: any, admin: any) => {
      await storeTokenCookies(token);
      await storeAdminCookies(admin);

      router.push("/dashboard");
    };

    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const adminData = searchParams.get("admin_data");
    if (accessToken && refreshToken && adminData) {
      setLoading(true);
      const token = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      storeCookies(token, JSON.stringify(adminData));
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
      {loading && <Spinner />}
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
