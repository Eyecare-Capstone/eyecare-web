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
          <AlertDialogAction>
            <DialogClose>
              <DropdownMenuItem className="focus:bg-blue-500 bg-blue-500">
                ok
              </DropdownMenuItem>
            </DialogClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
