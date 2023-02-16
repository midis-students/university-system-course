import { create } from "zustand";
import { ToastMessage, Toast } from "primereact/toast";

type ToastStore = {
  ref: Toast | null;
  show: (message: ToastMessage) => void;
  setRef: (ref: Toast) => void;
};

export const useToast = create<ToastStore>((set, get) => ({
  ref: null,
  show: (message) => get().ref?.show(message),
  setRef: (ref) => set({ ref }),
}));

export const useShowToast = () => useToast((selector) => selector.show);
