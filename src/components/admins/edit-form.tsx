"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
import { MutateNotification } from "../common/mutate-notification";
import { Spinner } from "../common/spinner";
import { useEffect } from "react";

const adminSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
});

export function EditForm({ id }: any) {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const mutation = useMutation({
    mutationKey: ["admin", id],
    mutationFn: (updatedAdmin: any) => {
      return axios.put(`${baseUrl}/admins/${id}`, updatedAdmin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["admin", id],
    queryFn: async () => {
      const res = await axios
        .get(`${baseUrl}/admins/${id}`)
        .then((res) => res.data);
      console.log(res.data);
      return res.data;
    },
  });

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: data?.email,
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
      await mutation.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Form {...form}>
      {isLoading && <Spinner />}
      {isError && (
        <MutateNotification variant="danger">
          Error getting this admin
        </MutateNotification>
      )}
      {mutation.isPending && <Spinner />}
      {mutation.isSuccess && (
        <MutateNotification>Admin updated successfully</MutateNotification>
      )}
      {mutation.isError && (
        <MutateNotification variant="danger">
          Failed to update this admin
        </MutateNotification>
      )}
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
