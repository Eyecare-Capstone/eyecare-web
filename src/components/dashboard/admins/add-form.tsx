"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { deleteCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";

const adminSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
});

export function AddForm({ setOpen }: any) {
  const { toast } = useToast();
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const router = useRouter();

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newAdmin: any) => {
      try {
        const res = await axios
          .post(`${adminApi}/admins`, newAdmin)
          .then((res) => res.data);
        return res;
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
