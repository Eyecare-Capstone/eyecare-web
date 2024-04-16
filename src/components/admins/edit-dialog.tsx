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
import { AddForm } from "./add-form";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../common/spinner";

export function EditDialog({ id }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/admins`);
      return res.json();
    },
  });
  return (
    <Dialog>
      {isLoading && <Spinner />}
      {isError && <Notification>Error edit this admin</Notification>}
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
        <AddForm />
      </DialogContent>
    </Dialog>
  );
}
