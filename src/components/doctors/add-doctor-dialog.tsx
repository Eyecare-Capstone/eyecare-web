import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoMdAdd } from "react-icons/io";
import { DoctorForm } from "./add-doctor-form";

export function AddDoctorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex gap-1 px-4 ml-2">
          <IoMdAdd className="w-4 h-4 text-white " />
          <span className="font-medium text-white">Add doctor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add new doctor to database</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <DoctorForm />
      </DialogContent>
    </Dialog>
  );
}
