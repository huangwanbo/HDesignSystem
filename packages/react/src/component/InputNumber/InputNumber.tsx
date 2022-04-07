import React, {
  forwardRef,
  useRef,
  ReactNode,
  CSSProperties,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import Input, { InputType } from "../Input/Input";
import { IconUp, IconDown, IconPlus, IconMinus } from "@DS/Icon";
import NP from "number-precision";
import cls from "classNames";
import { useMergeValue } from "../../_util/hook";
import { on, off } from "../../_util/event";
const prefixCls = "ds-input-number";
NP.enableBoundaryChecking(false);
type InputNumberType = {
  className: string | string[];
  style: CSSProperties;
  step: number;
  precision: number;
  min: number;
  max: number;
  mode: "embed" | "button";
  formatter: (value: number | string) => string;
  parse: (value: string) => number | string;
  icons: {
    up?: ReactNode;
    down?: ReactNode;
    plus?: ReactNode;
    minus?: ReactNode;
  };
  onBlur: (e: any) => void;
  onFocus: (e: any) => void;
  onChange: (e: any) => void;
  parser: (value: string) => number | string;
  size: "mini" | "small" | "default" | "large";
  placeholder: string;
  value: number | string;
  defaultValue: number;
  readOnly: boolean;
  error: boolean;
  disabled: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "className" | "size" | "onChange"
> &
  Omit<
    InputType,
    | "value"
    | "defaultValue"
    | "error"
    | "readOnly"
    | "disabled"
    | "placeholder"
    | "size"
    | "parse"
    | "onChange"
  >;

function ComponentRef(props: Partial<InputNumberType>, ref: any) {
  const {
    max = Infinity,
    min = -Infinity,
    step = 1,
    mode = "embed",
    parser = (input) => `${input}`.replace(/[^(0-9).]+/g, ""),
    defaultValue = 0,
    value: propValue,
    onChange,
    precision,
    onBlur,
    formatter,
    suffix,
    size = "default",
    ...rest
  } = props;
  //@ts-ignore
  const [value, setValue] = useMergeValue(defaultValue, propValue);
  const wrapRef = useRef();
  const inputRef = ref || useRef();
  const mergedPrecision = React.useMemo(() => {
    if (precision) {
      const decimal = String(step).split(".")[1];
      const stepPrecision = (decimal && decimal.length) || 0;
      return Math.max(stepPrecision, precision);
    }
    return null;
  }, [step, precision]);
  // 显示step_button
  const [hover, setHover] = useState(false);
  const cs = cls(`${prefixCls}`, {
    [`${prefixCls}-mode-${mode}`]: true,
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-mode-button-${size}`]: true,
  });
  const format = (value: string | number) => {
    if (formatter) {
      return formatter(value);
    }
    return value;
  };
  const handleChange = (e: string) => {
    let val = parser(e) || 0;
    if (min > val) {
      val = min;
    } else if (max < val) {
      val = max;
    }
    onChange && onChange(val);
    return format(val);
  };
  const handleUp = () => {
    if (props.disabled) return;
    const val = parser(String(inputRef.current.dom.value || 0));
    const newVal = NP.plus(val, step);
    setValue(
      mergedPrecision
        ? Math.min(max, newVal).toFixed(mergedPrecision)
        : Math.min(max, newVal)
    );
  };
  const handleDown = () => {
    if (props.disabled) return;
    const val = parser(String(inputRef.current.dom.value || 0));
    const newVal = NP.minus(val, step);
    setValue(
      mergedPrecision
        ? Math.max(min, newVal).toFixed(mergedPrecision)
        : Math.max(min, newVal)
    );
  };
  const handleBlur = () => {
    let val: string | number = parser(String(inputRef.current.dom.value || 0));
    val = mergedPrecision ? Number(val).toFixed(mergedPrecision) : val;
    onBlur && onBlur(val);
    setValue(val);
  };
  useEffect(() => {
    if (!wrapRef.current || props.disabled) return;
    const handleHover = () => {
      setHover(true);
    };
    const handleLeave = () => {
      setHover(false);
    };
    on(wrapRef.current, "mouseenter", handleHover);
    on(wrapRef.current, "mouseleave", handleLeave);
    return () => {
      if (!wrapRef.current) return;
      off(wrapRef.current, "mouseenter", handleHover);
      off(wrapRef.current, "mouseleave", handleLeave);
    };
  }, [wrapRef.current]);
  const renderStepButton = (icon: ReactNode, method: "up" | "down") => {
    return (
      <div
        className={cls(`${prefixCls}-step-button`, {
          [`${prefixCls}-step-disabled`]:
            props.disabled || method == "up" ? +value >= +max : +value <= +min,
        })}
        onClick={method == "up" ? handleUp : handleDown}
      >
        {icon}
      </div>
    );
  };
  const steplayer = hover ? (
    <div
      className={`${prefixCls}-step-layer`}
      style={{ opacity: hover ? "1" : "0" }}
    >
      {renderStepButton(<IconUp />, "up")}
      {renderStepButton(<IconDown />, "down")}
    </div>
  ) : (
    suffix
  );
  return (
    //@ts-ignore
    <div className={cs} ref={wrapRef}>
      {
        //@ts-ignore
        <Input
          aria-min={min}
          aria-max={max}
          aria-step={step}
          aria-mode={mode}
          onChange={handleChange}
          ref={inputRef}
          suffix={mode !== "button" && steplayer}
          value={format(value) as string}
          defaultValue={defaultValue}
          size={size}
          onBlur={handleBlur}
          addBefore={
            mode == "button" && renderStepButton(<IconMinus />, "down")
          }
          addAfter={mode == "button" && renderStepButton(<IconPlus />, "up")}
          {...rest}
        />
      }
    </div>
  );
}

const InputNumber = forwardRef(ComponentRef);
InputNumber.displayName = "InputNumber";
export default InputNumber;
