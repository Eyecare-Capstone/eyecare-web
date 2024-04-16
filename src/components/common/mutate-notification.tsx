import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function MutateNotification({ children, variant = "default" }: any) {
  return (
    <AlertDialog defaultOpen={true}>
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
        <AlertDialogFooter className="mx-auto mt-3 cursor-pointer">
          <AlertDialogAction className="hover:bg-blue-500 bg-blue-500 cursor-pointer">
            <DialogClose className="hover:bg-blue-500 bg-blue-500 cursor-pointer">
              <DropdownMenuItem className="focus:bg-blue-500 cursor-pointer">
                ok
              </DropdownMenuItem>
            </DialogClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
