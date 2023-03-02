import { useQuery } from "react-query";
import { useShowToast } from "@/store/toast";
import Module from "@/lib/api/module";
import { Entity } from "@/lib/api/entity";

export function useFindOne<T extends Entity>(module: Module<T>, id: number) {
  const toast = useShowToast();

  return useQuery({
    queryFn: () => module.get({ id }),
    queryKey: [module["table"].name],
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          severity: "error",
          summary: "Error",
          detail: error.message,
        });
      }
    },
  });
}
