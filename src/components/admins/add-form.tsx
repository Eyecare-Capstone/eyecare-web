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
import { AddNotification } from "../common/add-notification";
import { Spinner } from "../common/spinner";

const adminSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
});

export function AddForm() {
  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
    },
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newAdmin: any) => {
      return axios.post(`${baseUrl}/admins`, newAdmin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

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
      {mutation.isPending && <Spinner />}
      {mutation.isSuccess && (
        <AddNotification>New admin successfully added</AddNotification>
      )}
      {mutation.isError && (
        <AddNotification variant="danger">
          Failed to add new admin
        </AddNotification>
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
