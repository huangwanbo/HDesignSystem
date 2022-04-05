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
import Context from "./context";
const prefixCls = "ds-radio";

type RadioType = {
  style?: CSSProperties;
  className?: string | string[];
  disabled?: boolean;
  value?: any;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
};

function ComponentRef(props: RadioType, ref: any) {
  const {
    children,
    defaultChecked,
    checked: propChecked,
    value,
    disabled,
    onChange,
  } = props;
  const wrap_ref = ref || useRef();
  const inputRef = createRef<HTMLInputElement>();
  useImperativeHandle(wrap_ref, () => {
    return {
      dom: inputRef.current,
    };
  });
  const [checked, setChecked] = useMergeValue(
    defaultChecked || false,
    propChecked
  );
  const {
    onChange: ctxChange,
    value: ctxValue,
    type: ctxType,
  } = useContext(Context);
  const cs_wrap = cls(`${prefixCls}`, {
    [`${prefixCls}-button`]: ctxType == "button",
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
  });
  const cs_mask = cls(`${prefixCls}-mask-wrapper`);
  const handlerChange = () => {
    if (disabled || value === ctxValue) return;
    const val = !checked;
    setChecked(val);
    onChange && onChange(val);
    ctxChange && ctxChange(value, wrap_ref);
  };
  const renderChild = () => {
    if (ctxType == "button") {
      return <span className={`${prefixCls}-button-inner`}>{children}</span>;
    }
    if (typeof children === "function") {
      return children({ checked });
    }
    return (
      <>
        <span className={cs_mask}>
          <div className={`${prefixCls}-mask`}></div>
        </span>
        <span className={`${prefixCls}-text`}>{children}</span>
      </>
    );
  };
  return (
    <label className={cs_wrap} ref={wrap_ref} onClick={handlerChange}>
      <input type="radio" value={value} ref={inputRef} />
      {renderChild()}
    </label>
  );
}

const Radio = forwardRef(ComponentRef);
Radio.displayName = "Radio";
export default Radio;
