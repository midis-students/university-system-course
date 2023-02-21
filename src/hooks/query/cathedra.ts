import { TOAST_LIFE } from "@/config/toast";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { useQuery } from "react-query";

export function useAllCathedras() {
  const toast = useShowToast();

  return useQuery({
    queryFn: () => Api.instance.cathedra.getAll(),
    queryKey: ["cathedra"],
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: TOAST_LIFE,
        });
      }
    },
  });
}
