import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
export function DeleteConfirmation({ id }: any) {
  const [isOpen, setIsOpen] = useState(false);
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   onSuccess: () => {
  //     // Refresh query setelah data berhasil dihapus
  //     queryClient.invalidateQueries("admin");
  //   },
  // });

  // const handleDelete = (id: any) => {
  //   mutation.mutate(id);
  // };

  const handleOpen = () => setIsOpen((prev) => !prev);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MdOutlineDeleteForever className="text-red-500 text-xl " />
          <span className="text-xs">Delete admin</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this admin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove this admin from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-red-500">
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
