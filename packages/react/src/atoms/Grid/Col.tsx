import React, { forwardRef, CSSProperties, HTMLAttributes } from "react";
import cls from "classNames";
const prefixCls = "ds-col";
export type ColType = Partial<
  {
    style: CSSProperties;
    className: string;
    span: number;
    offset: number;
  } & HTMLAttributes<HTMLElement>
>;

function ColRef(props: ColType, ref: any) {
  const { style, className, span = 24, offset, children } = props;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${span}`]: true,
      [`${prefixCls}-offset-${offset}`]: !!offset,
    },
    className
  );
  return (
    <div ref={ref} style={style} className={cs}>
      {children}
    </div>
  );
}

const Col = forwardRef(ColRef);
Col.displayName = "Col";
export default Col;
