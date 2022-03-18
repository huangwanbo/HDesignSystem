import { createContext, } from "react";
import { labelPlacementType, statusType, type, sizeType } from './constants';
type AnchorContextType = {
    current: number,
    labelPlacement: string,
    status: string,
    type: string,
    size: string,
    addStep: (id: number, step: any) => void,
    deleteStep: (id: number) => void,
    handleChange: (id: number) => void,
};
const defaultContext = {
    current: 0,
    status: statusType.wait,
    labelPlacement: labelPlacementType.horizontal,
    type: type.default,
    size: sizeType.default,
    addStep: () => { },
    deleteStep: () => { },
    handleChange: () => { }
};
export default createContext<AnchorContextType>(defaultContext);
