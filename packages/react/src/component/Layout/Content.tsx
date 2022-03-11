import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
import ResizeObserverComponent from "../../_util/resizeObserver";
type ComponentProps = {
  style: CSSProperties;
  className: string;
} & HTMLAttributes<HTMLHeadElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const { style, className, children } = props;
  const cs = cls(`${prefixCls}-content`, className);
  return (
    <ResizeObserverComponent>
      <main ref={ref} style={style} className={cs}>
        {children}
      </main>
    </ResizeObserverComponent>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Content";
export default Component;
