import React, { forwardRef, useRef, useEffect } from "react";
import BaseInput, { BaseInputType } from "./BaseInput";
import { useMergeValue } from "../../_util/hook";
import { omit } from "lodash";
import { IconEyeInvisible, IconEye } from "@DS/Icon";
import cls from "classNames";
const prefixCls = "ds-input";

type InputType = {
  visibilityToggle: boolean;
  defaultVisibility: boolean;
  visible: boolean;
  onVisibilityChange: (value: boolean) => void;
} & BaseInputType;

function ComponentRef(props: Partial<InputType>, ref: any) {
  const inputRef = ref || useRef<BaseInputType>();
  const {
    defaultVisibility,
    visibilityToggle = true,
    visible: propVisible,
    onVisibilityChange,
  } = props;
  const [visible, setVisible] = useMergeValue(
    defaultVisibility || false,
    propVisible
  );
  useEffect(() => {
    onVisibilityChange && onVisibilityChange(!visible);
  }, [propVisible]);
  const suffix = visibilityToggle ? (
    visible ? (
      <IconEye onClick={() => setVisible(false)} />
    ) : (
      <IconEyeInvisible onClick={() => setVisible(true)} />
    )
  ) : null;
  const type = visible ? "text" : "password";
  const cs = cls(`${prefixCls}-password`);
  return (
    <span className={cs}>
      <BaseInput
        {...omit(props, [
          "defaultVisibility",
          "visibilityToggle",
          "visible",
          "onVisibilityChange",
        ])}
        ref={inputRef}
        suffix={suffix}
        type={type}
      />
    </span>
  );
}

const Password = forwardRef(ComponentRef);
Password.displayName = "Password";
export default Password;
