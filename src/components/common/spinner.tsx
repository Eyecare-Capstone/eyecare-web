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
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

export function Spinner({ variant = "beat", color = "blue" }: any) {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="w-80 flex flex-col justify-center items-center">
        {variant == "clip" && (
          <>
            <ClipLoader
              color={color}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <AlertDialogHeader className="ml-1">loading...</AlertDialogHeader>
          </>
        )}
        {variant == "beat" && (
          <BeatLoader
            color={color}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
