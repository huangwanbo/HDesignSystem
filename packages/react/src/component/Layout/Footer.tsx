import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
type ComponentProps = {
  style: CSSProperties;
  className: string;
} & HTMLAttributes<HTMLHeadElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const { style, className, children } = props;
  const cs = cls(`${prefixCls}-footer`, className);
  return (
    <footer ref={ref} style={style} className={cs}>
      {children}
    </footer>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Footer";
export default Component;
