import React from "react";
import {
  buttonSizes,
  buttonTypes,
  htmlType,
} from "../../foundation/ButtonProps";
import classNames from "classNames";
const prefix = "ds-button__container";
interface BaseButtonProps {
  children: string | React.ReactNode;
  type?: keyof typeof buttonTypes;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
  ghost?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
type AnchorButtonProps = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, "type" | "onClick">;
type NativeButtonProps = {
  htmlType?: keyof typeof htmlType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">;
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
const Button: React.FunctionComponent<ButtonProps> = React.forwardRef(
  (props, ref) => {
    const {
      children,
      type = "primary",
      size = "base",
      disabled = false,
      ghost = false,
      href,
      onClick,
      htmlType = "button",
      ...rest
    } = props;
    let component = "button";
    const buttonRef = (ref as any) || React.createRef<ButtonProps>();
    if (href) {
      component = "a";
    }
    const createOtherProps = () => {
      const otherProps: Partial<ButtonProps> = {};
      if (href) {
        otherProps.href = href;
      }

      return otherProps;
    };
    const cls = classNames(prefix, {
      [`${prefix}-${type}`]: !disabled,
      [`${prefix}-${size}`]: true,
      [`${prefix}-${type}-ghost`]: ghost,
      [`${prefix}-${type}-disabled`]: disabled,
    });
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      e.preventDefault();
      if (!disabled) {
        (
          onClick as React.MouseEventHandler<
            HTMLButtonElement | HTMLAnchorElement
          >
        )?.(e);
      }
    };
    return React.createElement(
      component,
      {
        type: htmlType,
        className: cls,
        ref: buttonRef,
        onClick: handleClick,
        ...createOtherProps(),
        ...rest,
      },
      children
    );
  }
);
Button.displayName = "Button";
export default Button;
