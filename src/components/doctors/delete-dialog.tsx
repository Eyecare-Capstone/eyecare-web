import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../common/spinner";
import { MutateNotification } from "../common/mutate-notification";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteDialog({ id }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const mutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`${baseUrl}/doctors/${id as string}`);
    },
    onSuccess: () => {
      // setTimeout(() => {
      //   queryClient.invalidateQueries({ queryKey: ["user"] });
      // }, 1000);
    },
  });

  const handleDelete = async (id: any) => {
    try {
      await mutation.mutateAsync(id);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Dialog>
      {mutation.isPending && <Spinner />}
      {mutation.isSuccess && (
        <MutateNotification>Successfully delete this doctor</MutateNotification>
      )}
      {mutation.isError && (
        <MutateNotification>Failed to add new doctor</MutateNotification>
      )}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MdOutlineDeleteForever className="text-red-500 text-xl " />
          <span className="text-xs">Delete doctor</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure you want to delete this doctor?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and
            remove this admin from our database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => handleDelete(id)}
            className="bg-red-500 hover:bg-red-500 cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
