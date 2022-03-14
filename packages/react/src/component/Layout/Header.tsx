import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
type ComponentProps = {
  style: CSSProperties;
  className: string;
} & HTMLAttributes<HTMLHeadElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const { style, className, children } = props;
  const cs = cls(`${prefixCls}-header`, className);
  return (
    <header ref={ref} style={style} className={cs}>
      {children}
    </header>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Header";
export default Component;
