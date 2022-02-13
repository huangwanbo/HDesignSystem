import React from "react";
import FontSize from "../../foundation/FontSize";
interface SpinProps {
    size?: keyof typeof FontSize;
    tip?: string;
    icon?: string;
    loading: boolean;
    customStyle?: React.CSSProperties;
    customClass?: string;
    delay?: number;
}
declare const SpinRef: React.ForwardRefExoticComponent<SpinProps & React.RefAttributes<unknown>>;
export default SpinRef;
