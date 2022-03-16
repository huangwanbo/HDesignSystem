import { createContext, } from "react";
import { labelPlacementType, statusType } from './constants';
type AnchorContextType = {
    current: number,
    labelPlacement: string,
    status: string,
    addStep: (id: number, step: any) => void,
    deleteStep: (id: number) => void,
    handleChange: (id: number) => void,
};
const defaultContext = {
    current: 0,
    status: statusType.wait,
    labelPlacement: labelPlacementType.horizontal,
    addStep: () => { },
    deleteStep: () => { },
    handleChange: () => { }
};
export default createContext<AnchorContextType>(defaultContext);
