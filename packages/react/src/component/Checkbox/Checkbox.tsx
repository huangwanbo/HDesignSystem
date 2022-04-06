import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  createRef,
  useImperativeHandle,
} from "react";
import cls from "classNames";
import { useMergeValue } from "../../_util/hook";
import Context from "./Context";
import IconCheck from "./IconCheck";
const prefixCls = "ds-checkbox";

type CheckboxType = {
  style?: CSSProperties;
  className?: string | string[];
  disabled?: boolean;
  value?: any;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
  indeterminate?: boolean;
};

function ComponentRef(props: CheckboxType, ref: any) {
  const {
    children,
    defaultChecked,
    checked: propChecked,
    value,
    disabled,
    onChange,
    indeterminate,
  } = props;
  const wrap_ref = ref || useRef();
  const inputRef = createRef<HTMLInputElement>();
  useImperativeHandle(wrap_ref, () => {
    return {
      dom: inputRef.current,
    };
  });
  const [checked, setChecked] = useMergeValue(
    defaultChecked || propChecked || false,
    propChecked
  );
  const CheckBoxContext = useContext(Context);
  const cs_wrap = cls(`${prefixCls}`, {
    [`${prefixCls}-indeterminate`]: indeterminate,
    [`${prefixCls}-checked`]: checked || indeterminate,
    [`${prefixCls}-disabled`]: disabled,
  });
  const cs_mask = cls(`${prefixCls}-mask-wrapper`);
  const handlerChange = (e: any) => {
    if (disabled) return;
    e.preventDefault();
    const val = !checked;
    setChecked(val);
    onChange && onChange(val);
    CheckBoxContext?.onChange && CheckBoxContext.onChange(value, val);
  };
  const renderChild = () => {
    // if (ctxType == "button") {
    //   return <span className={`${prefixCls}-button-inner`}>{children}</span>;
    // }
    if (typeof children === "function") {
      return children({ checked });
    }
    return (
      <>
        <span className={cs_mask}>
          <div className={`${prefixCls}-mask`}>
            <IconCheck className={`${prefixCls}-mask-icon`} />
          </div>
        </span>
        <span className={`${prefixCls}-text`}>{children}</span>
      </>
    );
  };
  return (
    <label className={cs_wrap} ref={wrap_ref} onClick={handlerChange}>
      <input type="checkbox" value={value} ref={inputRef} />
      {renderChild()}
    </label>
  );
}

const Checkbox = forwardRef(ComponentRef);
Checkbox.displayName = "Checkbox";
export default Checkbox;
