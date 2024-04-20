"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const handleClick = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth`).then((res) => res.data);
      router.push(res.url);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.async = true;
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* <div
        id="g_id_onload"
        data-client_id="183881121136-i1r500038rlmupheo9dpigthr8b5opmq.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:5000/auth"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="medium"
        data-logo_alignment="left"
      ></div> */}

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
