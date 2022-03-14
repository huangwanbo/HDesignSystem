import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import cls from "classNames";
import { IconClose, IconLoading } from "@DS/Icon";
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
    icon,
    closable,
    closeIcon,
    onClose,
    ...rest
  } = props;
  const otherProps = {
    ...rest,
  };
  const [isDestroy, setDestroy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(
    "checked" in props ? (props.checked as boolean) : defaultChecked
  );
  const mergeChecked = "checked" in props ? props.checked : checked;
  const _checked = checkable ? mergeChecked : true;
  const mergeStyle: CSSProperties = {
    ...style,
  };
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
    if (!("checked" in props)) {
      setChecked(!mergeChecked);
    }
    onCheck && onCheck(!mergeChecked);
  }
  function onHandleClose(e: React.MouseEvent<Element, MouseEvent>) {
    const rest = onClose && onClose(e);
    if (rest && rest.then) {
      setLoading(true);
      rest
        .then(() => {
          setLoading(false);
          setDestroy(true);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setDestroy(true);
    }
  }
  if (checkable) {
    otherProps.onClick = onHandleCheck;
  }
  if (closable && isDestroy) {
    return null;
  }
  return (
    <div ref={ref} style={mergeStyle} className={classNames} {...otherProps}>
      <span className={cls(`${prefixCls}-icon`)}>{icon}</span>
      {children}
      {closable && (
        <span className={cls(`${prefixCls}-close`)} onClick={onHandleClose}>
          {loading ? (
            <IconLoading className={`ds-spin-loading`} />
          ) : closeIcon ? (
            closeIcon
          ) : (
            <IconClose />
          )}
        </span>
      )}
    </div>
  );
};

const Tag = forwardRef<unknown, Partial<TagProps>>(Component);
Tag.displayName = "tag";
export default Tag;
