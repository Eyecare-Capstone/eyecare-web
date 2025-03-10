/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/spinner";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { deleteCookie, getToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { storeTokenCookies } from "@/lib/utils";

const adminSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
});

export function EditForm({ id, setOpen }: any) {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [isEnable, setIsEnable] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");

  // useEffect(() => {
  //   console.log("Access Token State Changed:", accessTokenData);
  // }, [accessTokenData]);

  // useEffect(() => {
  //   if (refreshTokenData) {
  //     console.log("Refresh Token State Changed:", refreshTokenData);
  //   }
  // }, [refreshTokenData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokens = await getToken();
        if (tokens) {
          const { accessToken, refreshToken } = tokens;
          setAccessTokenData(accessToken || "");
          setRefreshTokenData(refreshToken || "");

          // Log the tokens directly after fetching
          // console.log("Fetched Access Token:", accessToken);
          // console.log("Fetched Refresh Token:", refreshToken);
        } else {
          console.log("No tokens found");
        }
        setIsEnable(true);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);

  const mutation = useMutation({
    mutationKey: [`${id}`],
    mutationFn: async (updatedAdmin: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/admins/${id}`, updatedAdmin, {
            headers: {
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res: any = axiosError.response?.data;
          console.log(res);
          if (res.status == 401) {
            await deleteCookie("admin_data");
            await deleteCookie("access_token");
            await deleteCookie("refresh_token");
            router.push(`/auth?status=${res.status}&message=${res.message}"`);
          }
          await storeTokenCookies(res.token);
        } else {
          console.log("Unknown Error:", error);
        }
      }
    },
  });

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: [`${id}`],
    enabled: isEnable,
    queryFn: async () => {
      try {
        const res = await axios
          .get(`${adminApi}/admins/${id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        await storeTokenCookies(res.token);
        return res.data;
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
          await storeTokenCookies(res.token);
          return axiosError;
        } else {
          console.log("Unknown Error:", error);
          return error;
        }
      }
    },
  });

  if (isError) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({ email: data.email });
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    try {
      const data = {
        email: values.email,
      };
      const res = await mutation.mutateAsync(data);
      await storeTokenCookies(res.token);
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["admin"] });
        toast({
          title: `${getStatusText(res.status)} : ${res.status}`,
          description: `${res.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `${getStatusText(res.status)} : ${res.status}`,
          description: `${res.message}`,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  };

  return (
    <Form {...form}>
      {isLoading && <Spinner />}
      {mutation.isPending && <Spinner />}
      {isLoading && <Spinner />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email..." {...field} />
              </FormControl>
              <FormDescription>Admin's registered email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
