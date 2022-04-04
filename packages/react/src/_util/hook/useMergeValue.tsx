import { useState, useEffect, useRef } from "react";
export default function useMergeValue<T>(defaultValue: T, propsValue: T) {
  const [value, setValue] = useState<any>(defaultValue);
  const firstRef = useRef(1);
  useEffect(() => {
    if (firstRef.current === 1) {
      firstRef.current++;
      return;
    }
    setValue(propsValue);
  }, [propsValue]);
  return [value, setValue];
}
