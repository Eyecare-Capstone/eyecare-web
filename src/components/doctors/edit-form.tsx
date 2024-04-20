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

const userSchema = z.object({
  username: z.string().min(2, {
    message: "Required",
  }),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  avatar: z.string().url({
    message: "Invalid url format. Please enter a valid avatar url.",
  }),
});

export function EditForm({ id }: any) {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const mutation = useMutation({
    mutationKey: ["doctor", id],
    mutationFn: (updatedUser: any) => {
      return axios.put(`${baseUrl}/doctors/${id}`, updatedUser);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["doctor"] });
      }, 1000);
    },
  });

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await axios
        .get(`${baseUrl}/doctors/${id}`)
        .then((res) => res.data);
      console.log(res.data);
      return res.data;
    },
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: data?.username,
      email: data?.email,
      avatar: data?.avatar,
    },
  });
  useEffect(() => {
    if (data) {
      form.reset({
        username: data?.username,
        email: data?.email,
        avatar: data?.avatar,
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
          Error getting this user
        </MutateNotification>
      )}
      {mutation.isPending && <Spinner />}
      {mutation.isSuccess && (
        <MutateNotification>User updated successfully</MutateNotification>
      )}
      {mutation.isError && (
        <MutateNotification variant="danger">
          Failed to update this user
        </MutateNotification>
      )}
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
