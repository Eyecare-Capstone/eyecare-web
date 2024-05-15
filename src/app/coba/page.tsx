"use client";
import { storeTokenCookies } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CobaPage() {
  const handleClick = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { message, token } = await axios
        .post("http://localhost:3001")
        .then((res) => res.data);

      if (token) {
        await storeTokenCookies(token);
        console.log("32", message);
      }

      return "ok";
    } catch (error) {
      console.error("Error 37:", error);
    }
  };

  const handleClick2 = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { message, token } = await axios
        .get("http://localhost:3001/coba")
        .then((res) => res.data);

      if (token) {
        await storeTokenCookies(token);
        console.log("32", message);
      }

      return "ok";
    } catch (error) {
      console.error("Error 37:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>sent cookie</button>
      <button onClick={handleClick2} className="bg-red-200">
        sent req with cookie
      </button>
    </div>
  );
}
