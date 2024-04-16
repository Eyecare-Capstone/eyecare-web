"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

const doctorSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  picture: z.string().url({
    message: "Picture URL must be at least 2 characters.",
  }),
  long: z.string().min(2, {
    message: "Longitude must be at least 2 characters.",
  }),
  lat: z.string().min(2, {
    message: "Latitude must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be a valid URL.",
  }),
  star: z.string().min(0).max(5, {
    message: "Star rating must be between 0 and 5.",
  }),
  schedule: z.string().min(10, {
    message: "Schedule must be at least 10 characters.",
  }),
});

export function DoctorForm() {
  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
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

  function onSubmit(values: z.infer<typeof doctorSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter doctor name" {...field} />
              </FormControl>
              <FormDescription>
                This is the doctor public display name.
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
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Enter picture URL" {...field} />
              </FormControl>
              <FormDescription>
                This is the doctor public display picture URL.
              </FormDescription>
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
                <Input placeholder="Enter longitude" {...field} />
              </FormControl>
              <FormDescription>
                This is the longitude of the doctor location.
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
              <FormLabel>Lat</FormLabel>
              <FormControl>
                <Input placeholder="Enter latitude" {...field} />
              </FormControl>
              <FormDescription>
                This is the latitude of the doctor location.
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
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormDescription>
                This is the street address of the doctor location.
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
              <FormLabel>Star</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  max="5"
                  placeholder="Enter star rating"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the star rating of the doctor (0 to 5).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <DialogFooter className="col-span-2"> */}
        <Button type="submit">Submit</Button>
        {/* </DialogFooter> */}
      </form>
    </Form>
  );
}
