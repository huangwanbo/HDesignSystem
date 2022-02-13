import React from 'react';
import cls from 'classNames';

const prefix = "ds-button__container";
const Button = React.forwardRef((props, ref) => {
    const { children, type = "primary", size = "base", disabled = false, ghost = false, href, onClick, htmlType = 'button', ...rest } = props;
    let component = 'button';
    const buttonRef = ref || React.createRef();
    if (href) {
        component = 'a';
    }
    const createOtherProps = () => {
        const otherProps = {};
        if (href) {
            otherProps.href = href;
        }
        return otherProps;
    };
    const cls$1 = cls(prefix, {
        [`${prefix}-${type}`]: !disabled,
        [`${prefix}-${size}`]: true,
        [`${prefix}-${type}-ghost`]: ghost,
        [`${prefix}-${type}-disabled`]: disabled
    });
    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
            onClick?.(e);
        }
    };
    return (React.createElement(component, {
        type: htmlType,
        className: cls$1,
        ref: buttonRef,
        onClick: handleClick,
        ...createOtherProps(),
        ...rest
    }, children));
});
Button.displayName = "Button";

export { Button as default };
//# sourceMappingURL=Button.js.map
