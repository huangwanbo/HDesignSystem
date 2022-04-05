import React, { forwardRef, CSSProperties, ReactNode, useContext } from "react";
import Context from "./context";
import Radio from "./Radio";
import { useMergeValue } from "../../_util/hook";
import cls from "classNames";

const prefixCls = "ds-radio-group";
type optionType =
  | string
  | number
  | { label: ReactNode; value: any; disabled?: boolean };
type RadioGroupType = {
  style: CSSProperties;
  className: string | string[];
  name: string;
  type: "radio" | "button";
  direction: "vertical" | "horizontal";
  size: "small" | "default" | "large" | "mini";
  onChange: (value: any, e: any) => void;
  defaultValue: any;
  value: any;
  options: optionType[];
  children: ReactNode;
};

function ComponentRef(props: Partial<RadioGroupType>, ref: any) {
  const {
    onChange,
    defaultValue,
    value: propValue,
    type = "radio",
    options,
    children,
    className,
    style,
    size = "default",
    direction = "horizontal",
  } = props;
  const {} = useContext(Context);
  const [value, setValue] = useMergeValue(defaultValue, propValue);
  const handleChange = (v: any, e: any) => {
    console.log(e);

    if (v !== value) {
      setValue(v);
    }
    onChange && onChange(v, e);
  };
  const contextProps = {
    onChange: handleChange,
    value,
    type,
  };
  /*
   * 渲染children，如果有options优先级是options，第二是children
   */
  const renderChild = () => {
    if (options) {
      if (Array.isArray(options)) {
        return options.map((option, idx) => {
          if (typeof option == "object") {
            return (
              <Radio
                key={option.value}
                disabled={option.disabled as boolean}
                value={option.value}
                checked={value == option.value}
                defaultChecked={defaultValue == option?.value}
              >
                {option.label}
              </Radio>
            );
          }
          return (
            <Radio
              key={idx}
              value={option}
              checked={value == option}
              defaultChecked={defaultValue == option}
            >
              {option}
            </Radio>
          );
        });
      }
      return (
        <Radio
          key={options}
          value={options}
          checked={options == value}
          defaultChecked={defaultValue == options}
        >
          {options}
        </Radio>
      );
    }
    return React.Children.map(children, (child, idx) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child, {
        ...child.props,
        key: child.key || child.props?.value || idx,
        checked: child.props?.value == value,
        defaultChecked: defaultValue == child.props?.value,
      });
    });
  };
  const cs = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-${direction}`]: true,
      [`${prefixCls}-type-${type}`]: true,
      [`${prefixCls}-size-${size}`]: true,
    },
    className
  );
  return (
    <div ref={ref} className={cs} style={style}>
      <Context.Provider value={contextProps}>{renderChild()}</Context.Provider>
    </div>
  );
}

const RadioGroup = forwardRef(ComponentRef);
RadioGroup.displayName = "RadioGroup";
export default RadioGroup;
