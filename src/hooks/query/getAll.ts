import { useQuery } from 'react-query';
import { useShowToast } from '@/store/toast';
import Module from '@/lib/api/module';
import { Entity } from '@/lib/api/types';

export function useFindAll<T extends Entity>(module: Module<T>) {
  const toast = useShowToast();

  return useQuery({
    queryFn: () => module.getAll(),
    queryKey: [module['table'].name],
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
    },
  });
}
