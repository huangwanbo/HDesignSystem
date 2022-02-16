function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
import React, { useContext } from 'react';
var prefixCls = 'ds-icon';
function IconToolComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-tool")
    });
    if (spin) {
        props.className = "".concat(props.className, " ").concat(prefixCls, "-loading");
    }
    delete props.spin;
    delete props.isIcon;
    return(/*#__PURE__*/ React.createElement("svg", _extends({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, props), /*#__PURE__*/ React.createElement("path", {
        d: "M19.994 11.035c3.66-3.659 9.094-4.46 13.531-2.405a.1.1 0 0 1 .028.16l-6.488 6.488a1 1 0 0 0 0 1.414l4.243 4.243a1 1 0 0 0 1.414 0l6.488-6.488a.1.1 0 0 1 .16.028c2.056 4.437 1.254 9.872-2.405 13.53-3.695 3.696-9.2 4.477-13.66 2.347L12.923 40.733a1 1 0 0 1-1.414 0L7.266 36.49a1 1 0 0 1 0-1.414l10.382-10.382c-2.13-4.46-1.349-9.965 2.346-13.66Z"
    })));
}
var IconTool = /*#__PURE__*/ React.forwardRef(IconToolComponent);
IconTool.defaultProps = {
    isIcon: true
};
IconTool.displayName = 'IconTool';
export default IconTool;
