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
function IconTwitterCircleFillComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-twitter-circle-fill")
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
        fill: "currentColor",
        stroke: "none",
        d: "M24 1C11.296 1 1 11.297 1 24s10.296 23 23 23c12.703 0 23-10.297 23-23S36.703 1 24 1Zm11.698 18.592c-.13 9.818-6.408 16.542-15.78 16.965-3.864.176-6.664-1.072-9.1-2.62 2.855.456 6.397-.686 8.292-2.307-2.8-.273-4.458-1.698-5.233-3.991.808.14 1.66.103 2.43-.06-2.527-.846-4.331-2.407-4.424-5.68.709.323 1.448.626 2.43.686-1.891-1.075-3.29-5.007-1.688-7.607 2.806 3.076 6.182 5.586 11.724 5.926-1.391-5.949 6.492-9.175 9.791-5.177 1.395-.27 2.53-.799 3.622-1.374-.45 1.381-1.315 2.347-2.37 3.119 1.158-.157 2.184-.44 3.06-.872-.544 1.128-1.732 2.14-2.754 2.992Z"
    })));
}
var IconTwitterCircleFill = /*#__PURE__*/ React.forwardRef(IconTwitterCircleFillComponent);
IconTwitterCircleFill.defaultProps = {
    isIcon: true
};
IconTwitterCircleFill.displayName = 'IconTwitterCircleFill';
export default IconTwitterCircleFill;
