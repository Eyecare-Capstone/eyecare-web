import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export function MutateNotification({
  children,
  variant = "default",
  type = "dialog",
}: any) {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="w-80">
        <AlertDialogHeader>
          {variant == "default" ? (
            <AlertDialogTitle className="text-center font-bold text-green-500">
              Succeeded!
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle className="text-center font-bold text-red-500">
              Failed!
            </AlertDialogTitle>
          )}
          <AlertDialogDescription className="text-center">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto mt-3">
          <DialogClose>
            <DropdownMenuItem>
              <Button variant="outline">ok</Button>
            </DropdownMenuItem>
          </DialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
