import { create } from 'zustand';
import { ToastMessage, Toast } from 'primereact/toast';
import { TOAST_LIFE } from '@/config/toast';

type ToastStore = {
  ref: Toast | null;
  show: (message: ToastMessage) => void;
  setRef: (ref: Toast) => void;
};

export const useToast = create<ToastStore>((set, get) => ({
  ref: null,
  show: (message) => get().ref?.show({ ...message, life: TOAST_LIFE }),
  setRef: (ref) => set({ ref }),
}));

export const useShowToast = () => useToast((selector) => selector.show);
