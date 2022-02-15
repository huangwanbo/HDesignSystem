import React, { forwardRef, useState } from 'react';
import cls from 'classNames';

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
const Component = (props, ref) => {
    const { style, 
    // props
    className, children, size = "base", defaultChecked = false, checkable, onCheck, ...rest } = props;
    const otherProps = {
        ...rest,
    };
    const [checked, setChecked] = useState("checked" in props ? props.checked : defaultChecked);
    const mergeChecked = "checked" in props ? props.checked : checked;
    const _checked = checkable ? mergeChecked : true;
    const mergeStyle = {
        ...style,
    };
    console.log(checkable);
    const classNames = cls(`${prefixCls}`, {
        [`${prefixCls}-checked`]: _checked,
        [`${prefixCls}-checkable`]: checkable,
        [`${prefixCls}-size-${size}`]: true,
    }, className);
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
    return (React.createElement("div", { ref: ref, style: mergeStyle, className: classNames, ...otherProps }, children));
};
const Tag = forwardRef(Component);
Tag.displayName = "tag";

export { Tag as default };
//# sourceMappingURL=Tag.js.map
