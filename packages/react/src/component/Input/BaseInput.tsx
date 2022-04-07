import React, {
  forwardRef,
  CSSProperties,
  InputHTMLAttributes,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { IconClose } from "@DS/Icon";
import { on, off } from "../../_util/event";
import cls from "classNames";
import { useMergeValue } from "../../_util/hook";
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
  defaultValue: string | number;
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
  showWordLimit: boolean;
  isTextArea: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "className" | "size" | "height" | "maxLength"
> &
  Omit<
    TextareaHTMLAttributes<HTMLAreaElement>,
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
    showWordLimit,
    isTextArea,
    ...rest
  } = props;
  const [value, setValue] = useMergeValue(defaultValue || "", props.value);
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
    if (onChange) {
      setValue(onChange(val, e));
    } else {
      setValue(val);
    }
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
  const wordLength = () => {
    if (value === undefined || value === null) return 0;
    return String(value).length;
  };
  const limitDOM = (
    <span className={cls(`${prefixCls}-word-limit`)}>{`${wordLength()}/${
      props.maxLength
    }`}</span>
  );
  const prefixDOM = (
    <span className={cls(`${prefixCls}-group-prefix`)}>{prefix}</span>
  );
  const suffixDOM = (
    <span className={cls(`${prefixCls}-group-suffix`)}>
      {showWordLimit ? limitDOM : suffix}
    </span>
  );
  const hasSuffix = showWordLimit || !!suffix;
  const innerDOM = (
    <>
      {prefix && prefixDOM}
      {isTextArea ? (
        //@ts-ignore
        <textarea
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
      ) : (
        <input
          ref={inputRef}
          {...rest}
          value={value}
          onChange={handleChange}
          //defaultValue={defaultValue}
          onFocus={handleFouces}
          onBlur={handleBlur}
          className={cs}
          disabled={disabled}
        />
      )}
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
      {hasSuffix && suffixDOM}
    </span>
  ) : (
    <span className={cs_wrap} style={style} ref={wrapperRef}>
      {innerDOM}
      {hasSuffix && suffixDOM}
    </span>
  );
}
const BaseInput = forwardRef(ComponentRef);
BaseInput.defaultProps = {
  maxLength: 50,
};
BaseInput.displayName = "BaseInput";
export default BaseInput;
