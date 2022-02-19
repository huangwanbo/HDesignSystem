import React, { forwardRef, CSSProperties, HTMLAttributes } from "react";
import cls from "classNames";
const prefixCls = "ds-row";
type alignType = "start" | "center" | "end" | "stretch";
type justifyType =
  | "start"
  | "center"
  | "end"
  | "space-around"
  | " space-between";
type gutterType = number | [number, number?, number?, number?];
export type RowType = {
  style: CSSProperties;
  className: string;
  align: alignType;
  justify: justifyType;
  gutter: gutterType;
} & HTMLAttributes<HTMLElement>;

function RowRef(props: Partial<RowType>, ref: any) {
  const {
    style,
    className,
    align = "start",
    justify = "start",
    children,
    gutter,
  } = props;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-justify-${justify}`]: true,
    },
    className
  );
  const gutterStyle = (gutter: gutterType) => {
    if (!gutter) return {} as CSSProperties;
    if (!Array.isArray(gutter)) {
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      };
    } else {
      let str = "";
      gutter.forEach((g) => {
        str += `${g}px `;
      });
      return {
        padding: str,
      };
    }
  };
  const AdaptChilds =
    gutter &&
    children &&
    (Array.isArray(children) ? children : [children]).map((child, idx) =>
      React.cloneElement(child, {
        style: {
          ...child.props?.style,
          ...gutterStyle(gutter),
        },
        key: child.key || idx,
      })
    );
  return (
    <div ref={ref} style={style} className={cs}>
      {AdaptChilds}
    </div>
  );
}

const Row = forwardRef(RowRef);
Row.displayName = "row";
export default Row;
