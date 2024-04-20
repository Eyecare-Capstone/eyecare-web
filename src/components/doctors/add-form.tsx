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

const userSchema = z.object({
  name: z.string().min(2, {
    message: "Required",
  }),
  picture: z.string().url({
    message: "Invalid url format. Please enter a valid avatar url.",
  }),
  long: z.string().min(2, {
    message: "Invalid email format. Please enter a valid email address.",
  }),
  lat: z.string().min(2, {
    message: "Invalid email format. Please enter a valid email address.",
  }),
  address: z.string().min(2, {
    message: "Invalid email format. Please enter a valid email address.",
  }),
  star: z.string().min(2, {
    message: "Invalid email format. Please enter a valid email address.",
  }),
  schedule: z.string().min(2, {
    message: "Invalid email format. Please enter a valid email address.",
  }),
});

export function AddForm() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      picture: "",
      long: "",
      lat: "",
      address: "",
      star: "",
      schedule: "",
    },
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUser: any) => {
      return axios.post(`${baseUrl}/doctors`, newUser);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["doctor"] });
      }, 1000);
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const data = {
        name: values?.name,
        picture: values?.picture,
        long: values?.long,
        lat: values?.lat,
        address: values?.address,
        star: values?.star,
        schedule: values?.schedule,
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
        <AddNotification>New user successfully added</AddNotification>
      )}
      {mutation.isError && (
        <AddNotification variant="danger">
          Failed to add new user
        </AddNotification>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter name..." {...field} />
              </FormControl>
              <FormDescription>
                This is the doctor registered name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter picture url..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the doctor picture url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="long"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter doctor longitude..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the doctor longitude.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter doctor latitude..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the doctor latitude.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter doctor latitude..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the doctor street address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="star"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter doctor rating..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the doctor star rating.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter doctor schedule..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the doctor schedule.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
