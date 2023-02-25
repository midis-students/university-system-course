import { useQuery } from 'react-query';
import { useShowToast } from '@/store/toast';
import Api from '@/lib/api';

export function useAllTeachers() {
  const toast = useShowToast();

  return useQuery({
    queryFn: () => Api.instance.teacher.getAll(),
    queryKey: ['teacher'],
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
