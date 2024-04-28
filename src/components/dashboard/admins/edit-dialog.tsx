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
import { useEffect, useState } from "react";

export function EditDialog({ id }: any) {
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (open == true) {
      setOpen(undefined);
    }
  }, [open]);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-1"
          onClick={() => setOpen(true)}
        >
          <CiEdit className="text-ring text-xl" />
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
        <EditForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
