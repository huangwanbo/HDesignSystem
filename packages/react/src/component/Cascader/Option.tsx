import React, { forwardRef, ReactNode } from "react";
import { option } from "./interface";
import cls from "classNames";
import { IconRight } from "@DS/Icon";
const prefixCls = "ds-select-option";

function ComponentRef(
  props: Partial<Omit<option, "children">> & {
    children: ReactNode;
    childrenOpt: option[] | undefined;
    isLeaf: boolean;
  },
  ref: any
) {
  const { disabled, onClick, value, valueSelect, childrenOpt, isLeaf } = props;
  const cs = cls(`${prefixCls}`, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-selected`]: value === valueSelect,
  });
  const handleClick = () => {
    if (disabled) return;
    const val = {
      value,
      childrenOpt,
      isLeaf,
    };
    onClick && onClick(val);
  };

  return (
    <li className={cs} ref={ref} onClick={handleClick}>
      {props.children}
      {childrenOpt && <IconRight />}
    </li>
  );
}

const Option = forwardRef(ComponentRef);
Option.displayName = "Option";
export default Option;
