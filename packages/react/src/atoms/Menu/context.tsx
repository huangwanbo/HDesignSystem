import { createContext, ReactInstance } from "react";
type MenuContextType = {
  mode: string;
  collapsed: boolean;
  currentSelectedKey: string[];
  addItem: (linkName: string, target: ReactInstance) => void;
  deleteItem: (linkName: string) => void;
  handleItemClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    keys: string[]
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
