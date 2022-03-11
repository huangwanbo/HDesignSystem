import React, { forwardRef, CSSProperties, ReactNode } from "react";
import cls from "classNames";
const prefixCls = "ds-breadcrumb-item";

type ItemType = {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
};

function ComponentRef(props: ItemType, ref: any) {
  const { className, style, children } = props;
  return (
    <div className={cls(prefixCls, className)} style={style} ref={ref}>
      {children}
    </div>
  );
}

const Item = forwardRef(ComponentRef);
Item.displayName = "Item";
export default Item;
