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

export function AddNotification({ children, variant = "default" }: any) {
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
            <DialogClose>ok</DialogClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
