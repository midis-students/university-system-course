import { useQuery, UseQueryOptions } from 'react-query';
import { useShowToast } from '@/store/toast';

export function useQueryExt<Data>(options: UseQueryOptions<Data>) {
  const toast = useShowToast();

  return useQuery({
    ...options,
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
