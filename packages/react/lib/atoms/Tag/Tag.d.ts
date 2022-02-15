import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";
declare type sizeType = "small" | "base" | "large";
declare type TagProps = {
    style: CSSProperties;
    className: string;
    color: string;
    size: sizeType;
    closable: boolean;
    icon: ReactNode;
    closeIcon: ReactNode;
    onClose: (e: any) => Promise<void> | void;
    checkable: boolean;
    defaultChecked: boolean;
    checked: boolean;
    onCheck: (checked: boolean) => void;
} & HTMLAttributes<HTMLElement>;
declare const Tag: React.ForwardRefExoticComponent<Partial<TagProps> & React.RefAttributes<unknown>>;
export default Tag;
