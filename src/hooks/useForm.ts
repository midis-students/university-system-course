import { useState } from 'react';
export function useForm<T extends Object>(defaultState: T) {
  const [data, setData] = useState(defaultState);

  type dataKeys = keyof typeof data;

  const setValue = <K extends dataKeys>(key: K, value: typeof data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const getValue = <K extends dataKeys>(key: K) => {
    return data[key];
  };

  return {
    data,
    setValue,
    getValue,
    handle: (key: keyof typeof data) => {
      return {
        value: data[key] as string,
        onChange: (e: any) => setValue(key, e.target.value),
      };
    },
  };
}
