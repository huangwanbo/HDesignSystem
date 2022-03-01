import React from "react";

function useStatePromise<T>(initial: T): [T, (update: T) => Promise<T>] {
  const [value, setValue] = React.useState<T>(initial);
  const ref = React.useRef<any>(null);
  React.useEffect(() => {
    ref.current && ref.current(value);
  }, [value]);
  const setValuePromise = (update: T) =>
    new Promise<T>((resolve) => {
      setValue(update);
      ref.current = resolve;
    });
  return [value, setValuePromise];
}

export default useStatePromise;
