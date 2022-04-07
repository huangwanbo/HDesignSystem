import React, { forwardRef, CSSProperties, ReactNode } from "react";
import cls from "classNames";
import { useMergeValue } from "../../_util/hook";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { IconLoading } from "@DS/Icon";
const prefixCls = "ds-switch";

type SwitchType = {
  style: CSSProperties;
  className: string | string[];
  disabled: boolean;
  onChange: (value: boolean) => void;
  size: "small" | "default";
  type: "circle" | "round" | "line";
  checkedText: ReactNode;
  uncheckedText: ReactNode;
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
  defaultChecked: boolean;
  checked: boolean;
  loading: boolean;
};

function ComponentRef(props: Partial<SwitchType>, ref: any) {
  const {
    className,
    style,
    type = "circle",
    defaultChecked,
    checked: propChecked,
    disabled = false,
    onChange,
    uncheckedText,
    checkedText,
    uncheckedIcon,
    checkedIcon,
    loading,
    size = "default",
  } = props;
  const [checked, setChecked] = useMergeValue(
    defaultChecked || propChecked,
    propChecked
  );
  const handleChange = () => {
    if (disabled) return;
    const val = !checked;
    setChecked(val);
    onChange && onChange(val);
  };
  const cs = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-type-${type}`]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-size-${size}`]: true,
    },
    className
  );

  return (
    <button
      role="switch"
      className={cs}
      style={style}
      ref={ref}
      onClick={handleChange}
      disabled={disabled}
      aria-checked={!!checked}
    >
      <div className={`${prefixCls}-dot`}>
        {!loading ? (
          (checkedIcon || uncheckedIcon) && (
            <SwitchTransition>
              <CSSTransition
                key={checked ? "checked" : "unchecked"}
                timeout={200}
                classNames={"fadeIn"}
              >
                <span className={`${prefixCls}-dot-icon`}>
                  {checked ? checkedIcon : uncheckedIcon}
                </span>
              </CSSTransition>
            </SwitchTransition>
          )
        ) : (
          <span className={`${prefixCls}-dot-icon`}>
            <IconLoading />
          </span>
        )}
      </div>
      {size !== "small" && type != "line" && (checkedText || uncheckedText) && (
        <>
          <div className={`${prefixCls}-text-holder`}>
            {checked ? checkedText : uncheckedText}
          </div>
          <CSSTransition
            in={checked}
            timeout={200}
            classNames={"switchSlideText"}
            unmountOnExit={false}
            mountOnEnter={false}
          >
            <div className={`${prefixCls}-text`}>
              {checked ? checkedText : uncheckedText}
            </div>
          </CSSTransition>
        </>
      )}
    </button>
  );
}

const Switch = forwardRef(ComponentRef);
Switch.displayName = "Switch";
export default Switch;
