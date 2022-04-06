import { createContext } from "react";

type CheckoutGroupContextProps = {
  /*
   *   @params value 选项的value
   *   @params e 是否选择
   */
  onChange: (value: any[], e: any) => void;
  value: any[];
  disabled?: boolean;
  name?: string;
};
//@ts-ignore
export default createContext<CheckoutGroupContextProps>();
