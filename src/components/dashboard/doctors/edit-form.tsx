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
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/actions";
import Image from "next/image";

const doctorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name is required and must be at least 2 characters." }),
  picture: z
    .string()
    .min(2, { message: "Image URL is required and must be a valid URL" }),
  lon: z.string().min(2, { message: "Required" }),
  lat: z.string().min(2, { message: "Required" }),
  address: z.string().trim().min(2, { message: "Required" }),
  star: z.string().min(1, { message: "Required" }),
  monday: z.string().trim().optional(),
  tuesday: z.string().trim().optional(),
  wednesday: z.string().trim().optional(),
  thursday: z.string().trim().optional(),
  friday: z.string().trim().optional(),
  saturday: z.string().trim().optional(),
  sunday: z.string().trim().optional(),
});

export function EditForm({ id, setOpen }: any) {
  const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [picture, setPicture] = useState("");

  const mutation = useMutation({
    mutationKey: [`${id}`],
    mutationFn: async (updatedDoctor: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/admins/${id}`, updatedDoctor, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
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
          .get(`${adminApi}/doctors/${id}`)
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

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      picture: "",
      lon: "",
      lat: "",
      address: "",
      star: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name,
        picture: data?.picture,
        lon: data?.lon,
        lat: data?.lat,
        address: data?.address,
        star: data?.star,
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
        saturday: data?.saturday,
        sunday: data?.sunday,
      });
      if (
        data?.picture !== undefined &&
        data?.picture !== null &&
        data?.picture !== ""
      ) {
        setPicture(data.picture);
      } else {
        setPicture("");
      }
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    try {
      const data = {
        name: values.name,
        picture: values.picture,
        lon: values.lon,
        lat: values.lat,
        address: values.address,
        star: values.star,
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
        saturday: values.saturday,
        sunday: values.sunday,
      };
      const res = await mutation.mutateAsync(data);
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["doctor"] });
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 space-y-6"
        encType="multipart/form-data"
      >
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

        <Image src={picture} alt="picture" />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Upload Photo" {...field} />
              </FormControl>
              <FormDescription>This is the doctor picture url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="Enter doctor longitude..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the doctor longitude (decimal value allowed).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="Enter doctor latitude..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the doctor latitude (decimal value allowed).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter doctor address..."
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
              <FormLabel>Star Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  min="1"
                  max="5"
                  placeholder="Enter doctor rating (1-5)..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the doctor star rating (1-5).
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
