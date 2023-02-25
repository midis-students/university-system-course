import { useState } from 'react';
export function useInput(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return { value, onChange };
}
