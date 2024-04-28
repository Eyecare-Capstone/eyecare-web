import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getStatusText } from "http-status-codes";
import { deleteCookie } from "@/lib/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DeleteDialog({ id }: any) {
  const adminAPI = process.env.NEXT_PUBLIC_ADMIN_API;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: any) => {
      try {
        const res = await axios
          .delete(`${adminAPI}/users/${id as string}`)
          .then((res) => res.data);
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
          return axiosError.response?.data;
        } else {
          console.log("Unknown Error:", error);
        }
      }
    },
  });

  const handleDelete = async (id: any) => {
    try {
      const res = await mutation.mutateAsync(id);

      if (res.status == 200) {
        queryClient.refetchQueries({ queryKey: ["user"] });
        toast({
          title: ` ${getStatusText(res.status)} : ${res.status}`,
          description: `${res.message}`,
        });
      } else if (res.status == 401) {
        await deleteCookie("admin_data");
        await deleteCookie("access_token");
        await deleteCookie("refresh_token");
        router.push(`/auth?status=${res.status}&message=${res.message}"`);
      } else {
        toast({
          variant: "destructive",
          title: `${getStatusText(res.status)} : ${res.status}`,
          description: `${res.message}`,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MdOutlineDeleteForever className="text-red-500 text-xl" />
          <span className="text-xs">Delete users</span>
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
          <AlertDialogAction asChild>
            <DropdownMenuItem
              onClick={() => handleDelete(id)}
              className="bg-red-800 focus:bg-red-800 text-white/70 cursor-pointer hover:brightness-110"
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
