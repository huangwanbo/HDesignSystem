import { createContext } from "react";

type RadioGroupContextProps = {
  onChange: (value: any, target: any) => void;
  value: any;
  disabled?: boolean;
  name?: string;
  type?: "radio" | "button";
};
//@ts-ignore
export default createContext<RadioGroupContextProps>();
