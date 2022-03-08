import React from "react";
declare type positionType = "top" | "left" | "right" | "bottom";
declare const Tooltip: React.ForwardRefExoticComponent<{
    title: string;
    position: positionType;
    customStyle?: React.CSSProperties | undefined;
    customClass?: string | undefined;
} & React.AnchorHTMLAttributes<any> & React.RefAttributes<any>>;
export default Tooltip;
