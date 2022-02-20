import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
type ComponentProps = {
  style: CSSProperties;
  className: string;
} & HTMLAttributes<HTMLHeadElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const { style, className, children } = props;
  const cs = cls(`${prefixCls}-content`, className);
  return (
    <main ref={ref} style={style} className={cs}>
      {children}
    </main>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Content";
export default Component;
