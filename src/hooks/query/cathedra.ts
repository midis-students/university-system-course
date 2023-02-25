import { useQuery } from 'react-query';
import { useShowToast } from '@/store/toast';
import Api from '@/lib/api';

export function useAllCathedras() {
  const toast = useShowToast();

  return useQuery({
    queryFn: () => Api.instance.cathedra.getAll(),
    queryKey: ['cathedra'],
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
