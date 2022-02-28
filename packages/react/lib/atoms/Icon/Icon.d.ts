import React from "react";
declare const Icon: React.ForwardRefExoticComponent<{
    /**
     * user mobiriseIcons to
     * https://mobiriseicons.com/
     * see iconsName .
     * eg: name: book;
     */
    name: string;
    size?: "xs" | "sm" | "base" | "lg" | "xl" | undefined;
    /**
     * fontSize: 18px;
     */
    customStyle?: React.CSSProperties | undefined;
    customClass?: string | undefined;
} & React.AnchorHTMLAttributes<any> & React.RefAttributes<any>>;
export default Icon;
