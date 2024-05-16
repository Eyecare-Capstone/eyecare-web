"use server";
import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = cookies();

    const admin = cookieStore.get("admin_data")?.value;

    return JSON.parse(admin as string);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return null; // Return null for error handling
  }
}

export async function deleteCookie(name: string) {
  cookies().delete(`${name}`);
}

export async function getToken() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return null; // Return null for error handling
  }
}
