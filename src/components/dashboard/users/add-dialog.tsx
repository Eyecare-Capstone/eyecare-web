import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoMdAdd } from "react-icons/io";
import { AddForm } from "./add-form";
import { useEffect, useState } from "react";

export function AddDialog() {
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
          variant="default"
          size="sm"
          className="flex gap-1 px-4 ml-2"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd className="w-4 h-4 text-white " />
          <span className="font-medium text-white">Add user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Create new user to your database. Click submit when you are done.
          </DialogDescription>
        </DialogHeader>
        <AddForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
