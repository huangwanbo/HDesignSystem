import React from 'react';
import cls from 'classNames';

const Icon = React.forwardRef((props, ref) => {
    const { name, size = "base", customStyle, customClass, ...rest } = props;
    const classNames = cls({
        [`mbri-${name}`]: true,
        [`ds-icon-size-${size}`]: true,
        [`${customClass}`]: !!customClass,
    });
    return (React.createElement("span", { className: classNames, style: customStyle, ref: ref, ...rest }));
});

export { Icon as default };
//# sourceMappingURL=Icon.js.map
