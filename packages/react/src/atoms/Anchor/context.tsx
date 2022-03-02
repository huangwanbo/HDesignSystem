import { createContext, ReactInstance } from "react";
type AnchorContextType = {
  lineless: boolean | undefined;
  currentLink: string;
  addLink: (linkName: string, target: ReactInstance) => void;
  removeLink: (linkName: string) => void;
  handleClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => void;
  //changeLink: (currentLink: string) => void;
};
const defaultContext = {
  lineless: false,
  currentLink: "",
  addLink: () => {},
  removeLink: () => {},
  handleClick: () => {},
  // changeLink: () => {},
};
export default createContext<AnchorContextType>(defaultContext);
