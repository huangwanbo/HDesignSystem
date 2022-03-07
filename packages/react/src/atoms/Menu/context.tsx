import { createContext, ReactInstance } from "react";
type MenuContextType = {
  currentSelectedKey: string;
  addItem: (linkName: string, target: ReactInstance) => void;
  deleteItem: (linkName: string) => void;
  handleItemClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string
  ) => void;
};
const defaultContext = {
  currentSelectedKey: "",
  addItem: () => {},
  deleteItem: () => {},
  handleItemClick: () => {},
};
export default createContext<MenuContextType>(defaultContext);
