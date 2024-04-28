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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { deleteCookie } from "@/lib/actions";
import { getStatusText } from "http-status-codes";

const userSchema = z.object({
  username: z.string().min(2, {
    message: "Required",
  }),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  avatar: z.string().optional(),
});

export function EditForm({ id, setOpen }: any) {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [`${id}`],
    mutationFn: async (updatedUser: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/users/${id}`, updatedUser)
          .then((res) => res.data);
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
          return axiosError.response?.data;
        } else {
          console.log("Unknown Error:", error);
        }
      }
    },
  });

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: [`${id}`],
    queryFn: async () => {
      try {
        const res = await axios
          .get(`${adminApi}/users/${id}`)
          .then((res) => res.data);

        if (res.status == 401) {
          await deleteCookie("admin_data");
          await deleteCookie("access_token");
          await deleteCookie("refresh_token");
          router.push(`/auth?status=${res.status}&message=${res.message}"`);
        }

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
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
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["user"] });
        toast({
          title: `${getStatusText(res.status)} : ${res.status}`,
          description: `${res.message}`,
        });
      } else if (res.status == 401) {
        await deleteCookie("admin_data");
        await deleteCookie("access_token");
        await deleteCookie("refresh_token");
        router.push(`/auth?status=${res.status}&message=${res.message}"`);
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter username..." {...field} />
              </FormControl>
              <FormDescription>
                This is the user registered username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email..." {...field} />
              </FormControl>
              <FormDescription>
                This is the user registered email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User avatar</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter avatar url..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the user avatar url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
