import React, { useState, useCallback, useEffect } from 'react';
import cls from 'classNames';
import Icon from '../Icon/Icon.js';
import Text from '../Text/Text.js';
import debounce from 'lodash/debounce';

const prefixCls = `ds-spin`;
function Spin(props, ref) {
    const { size = "base", tip, customStyle, customClass, loading: propLoading, delay } = props;
    const [loading, setLoading] = useState(delay ? false : propLoading);
    const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay]);
    useEffect(() => {
        delay && debouncedSetLoading(propLoading);
        return () => {
            debouncedSetLoading && debouncedSetLoading.cancel();
        };
    }, [propLoading]);
    const classNames = cls({
        [`${prefixCls}-block`]: true,
    }, customClass);
    return (loading ? React.createElement("div", { ref: ref, style: customStyle, className: classNames },
        React.createElement(Icon, { name: "refresh", size: size, customClass: `${prefixCls}-loading`, customStyle: {} }),
        tip && (React.createElement("div", { className: `${prefixCls}-tip` },
            React.createElement(Text, null, tip)))) : null);
}
const SpinRef = React.forwardRef(Spin);
SpinRef.displayName = "Spin";

export { SpinRef as default };
//# sourceMappingURL=Spin.js.map
