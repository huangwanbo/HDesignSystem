import React from "react";
import IconSize from "../../foundation/FontSize";
import cls from "classNames";
import "@DS/scss/lib/icon/style.css";

type IconProps = {
  /**
   * user mobiriseIcons to
   * https://mobiriseicons.com/
   * see iconsName .
   * eg: name: book;
   */
  name: string;
  size?: keyof typeof IconSize;
  /**
   * fontSize: 18px;
   */
  customStyle?: React.CSSProperties;
  customClass?: string;
} & React.AnchorHTMLAttributes<any>;

const Icon = React.forwardRef<any, IconProps>((props, ref) => {
  const { name, size = "base", customStyle, customClass, ...rest } = props;
  const classNames = cls({
    [`mbri-${name}`]: true,
    [`ds-icon-size-${size}`]: true,
    [`${customClass}`]: !!customClass,
  });
  return (
    <span className={classNames} style={customStyle} ref={ref} {...rest}></span>
  );
});

export default Icon;
