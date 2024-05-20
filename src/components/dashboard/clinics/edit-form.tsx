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
import { Spinner } from "@/components/common/spinner";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { useRouter } from "next/navigation";
import { deleteCookie, getToken } from "@/lib/actions";
import Image from "next/image";
import { storeTokenCookies } from "@/lib/utils";

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name is required and must be at least 2 characters." }),
  picture: z
    .string()
    .min(2, { message: "Image URL is required and must be a valid URL" }),
  province: z.string().trim().min(2, { message: "Required." }),
  city: z.string().trim().min(2, { message: "Required." }),
  lon: z.string().min(2, { message: "Required" }),
  lat: z.string().min(2, { message: "Required" }),
  address: z.string().trim().min(2, { message: "Required" }),
  star: z.any(),
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
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState("");
  const [refreshTokenData, setRefreshTokenData] = useState("");

  // useEffect(() => {
  //   console.log("Access Token State Changed:", accessTokenData);
  // }, [accessTokenData]);

  // useEffect(() => {
  //   if (refreshTokenData) {
  //     console.log("Refresh Token State Changed:", refreshTokenData);
  //   }
  // }, [refreshTokenData]);

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
    mutationFn: async (updatedClinic: any) => {
      try {
        const res = await axios
          .put(`${adminApi}/clinics/${id}`, updatedClinic, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessTokenData}`,
              "x-refresh-token": `${refreshTokenData}`,
            },
          })
          .then((res) => res.data);
        // console.log(res);
        return res;
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
          .get(`${adminApi}/clinics/${id}`, {
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
          return error;
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

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      picture: "",
      province: "",
      city: "",
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
        province: data?.province,
        city: data?.city,
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

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      setFile(selectedFile);
      reader.readAsDataURL(selectedFile);
    }

    reader.onloadend = async () => {
      try {
        const imageData = reader.result as string;
        setPicture(imageData);
      } catch (e) {
        console.log(e);
      }
    };
  };

  useEffect(() => {
    if (file) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [file]);

  const onSubmit = async (values: any) => {
    try {
      // console.log(values);

      const schedule = {
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
        saturday: values.saturday,
        sunday: values.sunday,
      };

      // Add form fields to the FormData object
      const newDoctorFormData = new FormData();
      newDoctorFormData.append("name", values.name);
      newDoctorFormData.append("province", values.province);
      newDoctorFormData.append("city", values.city);
      newDoctorFormData.append("lon", values.lon);
      newDoctorFormData.append("lat", values.lat);
      newDoctorFormData.append("address", values.address);
      newDoctorFormData.append("star", values.star);
      newDoctorFormData.append("schedule", JSON.stringify(schedule));

      if (file) {
        newDoctorFormData.append("file", file);
        newDoctorFormData.append("pictureUrl", "");
      } else {
        newDoctorFormData.append("pictureUrl", picture);
      }

      const res = await mutation.mutateAsync(newDoctorFormData);
      // console.log("277", res.token);
      await storeTokenCookies(res.token);
      setOpen(false);
      if (res.status == 200) {
        form.reset();
        queryClient.refetchQueries({ queryKey: ["clinic"] });
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
      {mutation.isPending && <Spinner />}
      {isLoading && <Spinner />}
      {loading && <Spinner />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 space-y-6 w-full  h-full flex flex-col "
        encType="multipart/form-data"
      >
        {/* name*/}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Clinic Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic name..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* picture */}
        <div className="flex flex-row justify-center items-center gap-10  h-72 px-3">
          {!picture && (
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col  items-start">
                  <FormLabel>Picture</FormLabel>
                  <FormControl className="text-white/65 ">
                    <input
                      type="file"
                      required
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormDescription>Clinic's display picture.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {picture && (
            <div className="flex-1 h-auto flex flex-row justify-center items-center gap-10">
              <div className="flex-1 w-full  items-start flex flex-col gap-3">
                <FormLabel className="font-medium text-white ">
                  Picture
                </FormLabel>
                <Image
                  src={picture}
                  alt="clinic image"
                  width={100}
                  height={100}
                  className="object-cover h-auto w-full flex-1"
                />
              </div>
              <div className=" flex-1 flex justify-center">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPicture("");
                  }}
                >
                  Change picture
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* province city */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic province..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's province.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1 ">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic city..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's city.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* lon lat */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="lat"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic latitude..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's location latitude.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lon"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic longitude..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's location longitude.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* address star */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter clinic address..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's street address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="star"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    // step="0.1"
                    // min="1"
                    // max="5"
                    placeholder="Enter clinic rating (1-5)..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's star rating (1-5).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* monday tuesday */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="monday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Monday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's schedule for Monday.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tuesday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tuesday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Clinic's schedule for Tuesday.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* wednesday thursday */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="wednesday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Wednesday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Clinic's schedule for Wednesday.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thursday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Thursday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Clinic's schedule for Thursday.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* friday saturday */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="friday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Friday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's schedule for Friday.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saturday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Saturday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Clinic's schedule for Saturday.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* sunday submit */}
        <div className="flex flex-row justify-center items-center gap-10 p-2">
          <FormField
            control={form.control}
            name="sunday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Sunday</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the clinic's schedule...."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Clinic's schedule for Sunday.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
