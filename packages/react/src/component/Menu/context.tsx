import { createContext, ReactInstance } from "react";
type MenuContextType = {
  mode: string;
  collapsed: boolean;
  currentSelectedKey: (string | number)[];
  addItem: (linkName: string | number, target: ReactInstance) => void;
  deleteItem: (linkName: string | number) => void;
  handleItemClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    keys: (string | number)[]
  ) => void;
};
const defaultContext = {
  currentSelectedKey: [],
  addItem: () => {},
  deleteItem: () => {},
  handleItemClick: () => {},
  mode: "",
  collapsed: false,
};
export default createContext<MenuContextType>(defaultContext);
