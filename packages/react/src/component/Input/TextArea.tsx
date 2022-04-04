import React, { forwardRef, useRef } from "react";
import BaseInput, { BaseInputType } from "./BaseInput";
// import { omit } from "lodash";
import cls from "classNames";
const prefixCls = "ds-input";

type InputType = {} & BaseInputType;

function ComponentRef(props: Partial<InputType>, ref: any) {
  const inputRef = ref || useRef<BaseInputType>();
  const cs = cls(`${prefixCls}-textarea`);
  return (
    <span className={cs}>
      <BaseInput {...props} ref={inputRef} isTextArea />
    </span>
  );
}

const TextArea = forwardRef(ComponentRef);
TextArea.displayName = "TextArea";
export default TextArea;
