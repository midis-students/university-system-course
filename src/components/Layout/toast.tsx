import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useToast } from "@/store/toast";

export default function ToastWrapper() {
  const ref = useRef<Toast>(null);
  const setRef = useToast((selector) => selector.setRef);

  useEffect(() => {
    if (ref.current) {
      setRef(ref.current);
    }
  }, [ref.current]);

  return <Toast ref={ref} position="bottom-right" />;
}
