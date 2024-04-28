"use server";
import { cookies } from "next/headers";

// const cookieStore = cookies();

export async function getAccessToken() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    return accessToken;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return null; // Return null for error handling
  }
}
export async function getRefreshToken() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    return refreshToken;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return null; // Return null for error handling
  }
}
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

export async function storeCookie(name: string, value: string) {
  cookies().set({
    name: name,
    value: value,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
}

export async function getToken() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    return token;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return null; // Return null for error handling
  }
}
