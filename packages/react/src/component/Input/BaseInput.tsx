import React, {
  forwardRef,
  CSSProperties,
  InputHTMLAttributes,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  ReactNode,
} from "react";
import { IconClose } from "@DS/Icon";
import { on, off } from "../../_util/event";
import cls from "classNames";
const prefixCls = "ds-input";
const sizeType = Object.freeze({
  mini: "mini",
  small: "small",
  default: "default",
  large: "large",
});
export type BaseInputType = {
  style: CSSProperties;
  className: string | string[];
  allowClear: boolean;
  disabled: boolean;
  readOnly: boolean;
  defaultValue: string;
  placeholder: string;
  error: boolean;
  onChange: (value: string, e: any) => void;
  onClear: () => void;
  onPressEnter: (e: any) => void;
  value: string;
  size: keyof typeof sizeType;
  height: number | string;
  maxLength: number;
  prefix: ReactNode;
  suffix: ReactNode;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "className" | "size" | "height" | "maxLength"
>;

function ComponentRef(props: Partial<BaseInputType>, ref: any) {
  const {
    className,
    style,
    defaultValue,
    onChange,
    size = sizeType.default,
    allowClear,
    onFocus,
    onBlur,
    onClear,
    error,
    disabled,
    prefix,
    suffix,
    ...rest
  } = props;
  const [value, setValue] = useState("");
  const [showClose, setShowClose] = useState(false);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const handleChange = (e: any) => {
    const val = e.target.value;
    if (val.length > 0) {
      setShowClose(true);
    } else {
      setShowClose(false);
    }
    onChange && onChange(val, e);
    setValue(val);
  };
  const handleFouces = (e: any) => {
    setFocus(true);
    if (value.length > 0) {
      setShowClose(true);
    }
    onFocus && onFocus(e);
  };
  const handleBlur = (e: any) => {
    setFocus(false);
    setShowClose(false);
    onBlur && onBlur(e);
  };
  const handleClear = () => {
    setValue("");
    onClear && onClear();
    inputRef.current.focus();
    console.log("handleClear");
  };
  useImperativeHandle(ref, () => {
    return {
      dom: inputRef.current,
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    };
  });
  useEffect(() => {
    if (!inputRef.current) return;
    const handleHover = () => {
      if (!inputRef.current) return;
      if (inputRef.current.value?.length === 0) return;
      setShowClose(true);
    };
    const handleLeave = () => {
      setShowClose(false);
    };
    on(wrapperRef.current, "mouseenter", handleHover);
    on(wrapperRef.current, "mouseleave", handleLeave);
    return () => {
      if (!wrapperRef.current) return;
      off(wrapperRef.current, "mouseenter", handleHover);
      off(wrapperRef.current, "mouseleave", handleLeave);
    };
  }, [inputRef.current]);
  const cs = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-size-${size}`]: true,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-disabled`]: disabled,
    },
    className
  );
  const cs_wrap = cls(`${prefixCls}-inner-wrapper`, {
    [`${prefixCls}-inner-wrapper-focus`]: focus,
  });
  const prefixDOM = (
    <span className={cls(`${prefixCls}-group-prefix`)}>{prefix}</span>
  );
  const suffixDOM = (
    <span className={cls(`${prefixCls}-group-suffix`)}>{suffix}</span>
  );
  const innerDOM = (
    <>
      {prefix && prefixDOM}
      <input
        ref={inputRef}
        {...rest}
        value={value}
        onChange={handleChange}
        defaultValue={defaultValue}
        onFocus={handleFouces}
        onBlur={handleBlur}
        className={cs}
        disabled={disabled}
      />
    </>
  );
  return allowClear && !error ? (
    <span className={cs_wrap} style={style} ref={wrapperRef}>
      {innerDOM}
      {showClose && (
        <span
          className="ds-icon-hover"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        >
          <IconClose
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </span>
      )}
      {suffix && suffixDOM}
    </span>
  ) : (
    <span className={cs_wrap} style={style} ref={wrapperRef}>
      {innerDOM}
      {suffix && suffixDOM}
    </span>
  );
}
const BaseInput = forwardRef(ComponentRef);
BaseInput.displayName = "BaseInput";
export default BaseInput;
