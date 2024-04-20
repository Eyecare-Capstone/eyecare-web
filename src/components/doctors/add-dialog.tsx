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

export function AddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex gap-1 px-4 ml-2">
          <IoMdAdd className="w-4 h-4 text-white " />
          <span className="font-medium text-white">Add doctor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add doctor</DialogTitle>
          <DialogDescription>
            Create new doctor to your database. Click submit when you are done.
          </DialogDescription>
        </DialogHeader>
        <AddForm />
      </DialogContent>
    </Dialog>
  );
}
