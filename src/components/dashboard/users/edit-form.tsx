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
import { Spinner } from "../../common/spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { deleteCookie, getToken } from "@/lib/actions";
import { getStatusText } from "http-status-codes";
import { storeTokenCookies } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  username: z.string().min(2, {
    message: "Required",
  }),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  avatar: z.string().optional(),
  status: z.string().optional(),
});

export function EditForm({ id, setOpen }: any) {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [isEnable, setIsEnable] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");

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
    mutationFn: async (updatedUser: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/users/${id}`, updatedUser, {
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
          console.log(error);
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
          .get(`${adminApi}/users/${id}`, {
            headers: {
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

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      avatar: "",
      status: "",
    },
  });

  if (isError) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }

  useEffect(() => {
    if (data) {
      form.reset({
        username: data?.username,
        email: data?.email,
        avatar: data?.avatar ? data?.avatar : "",
        status: data?.status ? data?.status : "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    try {
      const data = {
        username: values.username,
        email: values.email,
        avatar: values.avatar,
      };
      const res = await mutation.mutateAsync(data);
      await storeTokenCookies(res.token);
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["user"] });
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

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 space-y-6 w-full flex flex-col "
      >
        {/* username email */}
        <div className="flex flex-row gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter username..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>User's registered username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email..." {...field} />
                </FormControl>
                <FormDescription>User's registered email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* avatar status */}
        <div className="flex flex-row gap-3 ">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Enter avatar url..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>User's avatar url.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full" {...field}>
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="deactive">Deactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>User's status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </Form>
  );
}
