import React, { forwardRef, CSSProperties, ReactNode, useContext } from "react";
import Context from "./Context";
import Checkbox from "./Checkbox";
import { useMergeValue } from "../../_util/hook";
import { differenceBy } from "lodash";
import cls from "classNames";

const prefixCls = "ds-checkbox-group";
type optionType =
  | string
  | number
  | { label: ReactNode; value: any; disabled?: boolean };
type CheckboxGroupType = {
  style: CSSProperties;
  className: string | string[];
  name: string;
  type: "Checkbox";
  direction: "vertical" | "horizontal";
  size: "small" | "default" | "large" | "mini";
  onChange: (value: any) => void;
  defaultValue: any;
  value: any;
  options: optionType[];
  children: ReactNode;
};

function ComponentRef(props: Partial<CheckboxGroupType>, ref: any) {
  const {
    onChange,
    defaultValue,
    value: propValue,
    type = "checkbox",
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
    //如果v存在，同时e=false，那就删除
    //如果v不存在，e=true，那就添加
    let currentVal = typeof value === "undefined" ? [] : value;
    let newValue;
    if (currentVal?.includes(v) && !e) {
      newValue = differenceBy(currentVal, [v]);
      setValue(newValue);
    }
    if (!currentVal?.includes(v) && e) {
      newValue = currentVal;
      newValue.push(v);
      setValue(newValue);
    }
    onChange && onChange(v);
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
              <Checkbox
                key={option.value}
                disabled={option.disabled as boolean}
                value={option.value}
                checked={value?.includes(option.value)}
                defaultChecked={defaultValue?.includes(option?.value)}
              >
                {option.label}
              </Checkbox>
            );
          }
          return (
            <Checkbox
              key={idx}
              value={option}
              checked={value?.includes(option)}
              defaultChecked={defaultValue?.includes(option)}
            >
              {option}
            </Checkbox>
          );
        });
      }
      return (
        <Checkbox
          key={options}
          value={options}
          checked={value?.includes(options)}
          defaultChecked={defaultValue?.includes(options)}
        >
          {options}
        </Checkbox>
      );
    }
    return React.Children.map(children, (child, idx) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child, {
        ...child.props,
        key: child.key || child.props?.value || idx,
        checked: value?.includes(child.props?.value),
        defaultChecked: defaultValue?.includes(child.props?.value),
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

const CheckboxGroup = forwardRef(ComponentRef);
CheckboxGroup.displayName = "CheckboxGroup";
export default CheckboxGroup;
