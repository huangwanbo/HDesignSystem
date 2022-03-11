import React, { CSSProperties, forwardRef, ReactNode } from "react";
import cls from "classNames";
const prefixCls = "ds-divider";
type DividerType = {
  style: CSSProperties;
  className: string;
  type: "horizontal" | "vertical";
  orientation: "left" | "right" | "center";
  children: ReactNode | string;
};

function DividerRef(props: Partial<DividerType>, ref: any) {
  const {
    className,
    style,
    type = "horizontal",
    orientation = "center",
    children,
  } = props;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-with-text`]: children,
      [`${prefixCls}-with-text-${orientation}`]: children,
    },
    className
  );
  return (
    <div ref={ref} className={cs} style={style}>
      {children && (
        <span
          className={cls(
            `${prefixCls}-text`,
            `${prefixCls}-text-${orientation}`
          )}
        >
          {children}
        </span>
      )}
    </div>
  );
}

const Divider = forwardRef(DividerRef);
Divider.displayName = "divider";
export default Divider;
