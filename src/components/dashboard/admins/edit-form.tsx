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
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { deleteCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";

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

  const mutation = useMutation({
    mutationKey: [`${id}`],
    mutationFn: async (updatedAdmin: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/admins/${id}`, updatedAdmin)
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
          .get(`${adminApi}/admins/${id}`)
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
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["admin"] });
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
      {mutation.isPending && <Spinner />}
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
              <FormDescription>
                This is the admin registered email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
