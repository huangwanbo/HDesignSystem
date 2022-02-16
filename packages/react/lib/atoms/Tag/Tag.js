import React, { forwardRef, useState } from 'react';
import cls from 'classNames';
import { IconLoading, IconClose } from '@DS/Icon';

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
    className, children, size = "base", defaultChecked = false, checkable, onCheck, icon, closable, closeIcon, onClose, ...rest } = props;
    const otherProps = {
        ...rest,
    };
    const [isDestroy, setDestroy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState("checked" in props ? props.checked : defaultChecked);
    const mergeChecked = "checked" in props ? props.checked : checked;
    const _checked = checkable ? mergeChecked : true;
    const mergeStyle = {
        ...style,
    };
    const classNames = cls(`${prefixCls}`, {
        [`${prefixCls}-checked`]: _checked,
        [`${prefixCls}-checkable`]: checkable,
        [`${prefixCls}-size-${size}`]: true,
    }, className);
    function onHandleCheck() {
        if (!("checked" in props)) {
            setChecked(!mergeChecked);
        }
        onCheck && onCheck(!mergeChecked);
    }
    function onHandleClose(e) {
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
        }
        else {
            setDestroy(true);
        }
    }
    if (checkable) {
        otherProps.onClick = onHandleCheck;
    }
    if (closable && isDestroy) {
        return null;
    }
    return (React.createElement("div", { ref: ref, style: mergeStyle, className: classNames, ...otherProps },
        React.createElement("span", { className: cls(`${prefixCls}-icon`) }, icon),
        children,
        closable && (React.createElement("span", { className: cls(`${prefixCls}-close`), onClick: onHandleClose }, loading ? (React.createElement(IconLoading, { className: `ds-spin-loading` })) : closeIcon ? (closeIcon) : (React.createElement(IconClose, null))))));
};
const Tag = forwardRef(Component);
Tag.displayName = "tag";

export { Tag as default };
//# sourceMappingURL=Tag.js.map
