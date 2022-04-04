import React, { forwardRef, ReactNode, useRef, CSSProperties } from "react";
import BaseInput, { BaseInputType } from "./BaseInput";
import TextArea from "./TextArea";
import Password from "./Password";
import Search from "./Search";
import { omit } from "lodash";
import cls from "classNames";
const prefixCls = "ds-input";

type InputType = {
  addBefore: ReactNode;
  addAfter: ReactNode;
  beforeStyle: CSSProperties;
  afterStyle: CSSProperties;
} & BaseInputType;

function ComponentRef(props: Partial<InputType>, ref: any) {
  const { addBefore, addAfter, beforeStyle, afterStyle } = props;
  const inputRef = ref || useRef<BaseInputType>();
  const BeforeDOM = (
    <span className={cls(`${prefixCls}-group-addbefore`)} style={beforeStyle}>
      {addBefore}
    </span>
  );
  const AfterDOM = (
    <span className={cls(`${prefixCls}-group-addafter`)} style={afterStyle}>
      {addAfter}
    </span>
  );

  const cs = cls(`${prefixCls}-group`);
  const cs_wrap = cls(`${prefixCls}-group-wrapper`);
  //const cs_inner = cls(`${prefixCls}-group-inner`);
  return addBefore || addAfter ? (
    <div className={cs_wrap} style={props.style}>
      <span className={cs}>
        {addBefore && BeforeDOM}
        {/* <span className={cs_inner}> */}
        <BaseInput
          {...omit(props, [
            "style",
            "addBefore",
            "addAfter",
            "beforeStyle",
            "afterStyle",
          ])}
          ref={inputRef}
        />
        {addAfter && AfterDOM}
      </span>
      {/* </span> */}
    </div>
  ) : (
    <BaseInput {...props} ref={inputRef} />
  );
}

const Component = forwardRef(ComponentRef);
const Input = Component as typeof Component & {
  TextArea: typeof TextArea;
  Password: typeof Password;
  Search: typeof Search;
};
Input.TextArea = TextArea;
Input.Password = Password;
Input.Search = Search;
Input.displayName = "Input";
export default Input;
