import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { EditForm } from "./edit-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../common/spinner";
import { Notification } from "../common/add-notification";

export function EditDialog({ id }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["admin", id],
    queryFn: async () => {
      const res = await axios
        .get(`${baseUrl}/admins/${id}`)
        .then((res) => res.data);
      return res.data;
    },
  });

  return (
    <Dialog>
      {isLoading && <Spinner />}
      {isError && (
        <Notification variant="danger" type="edit">
          Error getting this admin
        </Notification>
      )}
      <DialogTrigger asChild>
        <Button variant="outline">
          <CiEdit className="text-ring text-xl " />
          <span className="text-xs">Edit admin</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update admin</DialogTitle>
          <DialogDescription>
            Update this admin to your database. Click submit when you are done.
          </DialogDescription>
        </DialogHeader>
        <EditForm data={data} id={id} />
      </DialogContent>
    </Dialog>
  );
}
