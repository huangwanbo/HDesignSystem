import React, { forwardRef, ReactNode } from "react";
import { option } from "./interface";
import cls from "classNames";
const prefixCls = "ds-select-option";

function ComponentRef(
  props: Partial<option> & { children: ReactNode },
  ref: any
) {
  const { disabled, onClick, value, valueSelect } = props;
  const cs = cls(`${prefixCls}`, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-selected`]: value === valueSelect,
  });
  const handleClick = () => {
    if (disabled) return;
    onClick && onClick(value);
  };

  return (
    <li className={cs} ref={ref} onClick={handleClick}>
      {props.children}
    </li>
  );
}

const Option = forwardRef(ComponentRef);
Option.displayName = "Option";
export default Option;
