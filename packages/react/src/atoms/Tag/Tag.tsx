import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import cls from "classNames";
// const COLORS = [
//   "red",
//   "orangered",
//   "orange",
//   "gold",
//   "lime",
//   "green",
//   "cyan",
//   "blue",
//   "purple",
//   "magenta",
//   "gray",
// ];
const prefixCls = "ds-tag";
type sizeType = "small" | "base" | "large";
type TagProps = {
  style: CSSProperties;
  className: string;
  color: string;
  size: sizeType;
  closable: boolean;
  icon: ReactNode;
  closeIcon: ReactNode;
  onClose: (e: any) => Promise<void> | void;
  checkable: boolean;
  defaultChecked: boolean;
  checked: boolean;
  onCheck: (checked: boolean) => void;
} & HTMLAttributes<HTMLElement>;
const Component = (props: Partial<TagProps>, ref: any) => {
  const {
    style,
    // props
    className,
    children,
    size = "base",
    defaultChecked = false,
    checkable,
    onCheck,
    ...rest
  } = props;
  const otherProps = {
    ...rest,
  };
  const [checked, setChecked] = useState<boolean>(
    "checked" in props ? (props.checked as boolean) : defaultChecked
  );
  const mergeChecked = "checked" in props ? props.checked : checked;
  const _checked = checkable ? mergeChecked : true;
  const mergeStyle: CSSProperties = {
    ...style,
  };
  console.log(checkable);

  const classNames = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-checked`]: _checked,
      [`${prefixCls}-checkable`]: checkable,
      [`${prefixCls}-size-${size}`]: true,
    },
    className
  );
  function onHandleCheck() {
    console.log(mergeChecked);

    if (!("checked" in props)) {
      setChecked(!mergeChecked);
    }
    onCheck && onCheck(!mergeChecked);
  }
  if (checkable) {
    otherProps.onClick = onHandleCheck;
  }
  return (
    <div ref={ref} style={mergeStyle} className={classNames} {...otherProps}>
      {children}
    </div>
  );
};

const Tag = forwardRef<unknown, Partial<TagProps>>(Component);
Tag.displayName = "tag";
export default Tag;
