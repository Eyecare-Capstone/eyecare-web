import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function storeTokenCookies(token: any) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    axios.defaults.withCredentials = true;
    const res = await axios
      .put(`${BASE_URL}/api`, token, {
        headers: {
          Authorization: `${API_KEY}`,
        },
      })
      .then((res) => res.data);

    if (res == "success") {
      return res;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function storeAdminCookies(adminData: string) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    axios.defaults.withCredentials = true;
    const res = await axios
      .post(`${BASE_URL}/api`, adminData, {
        headers: {
          Authorization: `${API_KEY}`,
        },
      })
      .then((res) => res.data);

    if (res == "success") {
      return res;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function filterUsersData(users: any, filter: string) {
  try {
    if (!users) {
      throw new Error("Users data is empty.");
    }

    const filteredUsers = users.filter((user: any) => {
      return user.status === filter;
    });

    return filteredUsers;
  } catch (error) {
    console.error("Error filtering users data:", error);
    return [];
  }
}
