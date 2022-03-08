import React from "react";
import { buttonSizes, buttonTypes, htmlType } from "../../foundation/ButtonProps";
interface BaseButtonProps {
    children: string | React.ReactNode;
    type?: keyof typeof buttonTypes;
    size?: keyof typeof buttonSizes;
    disabled?: boolean;
    ghost?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
declare type AnchorButtonProps = {
    href?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
declare type NativeButtonProps = {
    htmlType?: keyof typeof htmlType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
declare type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
declare const Button: React.FunctionComponent<ButtonProps>;
export default Button;
