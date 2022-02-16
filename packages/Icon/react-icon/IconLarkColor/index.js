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
function IconLarkColorComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-lark-color")
    });
    if (spin) {
        props.className = "".concat(props.className, " ").concat(prefixCls, "-loading");
    }
    delete props.spin;
    delete props.isIcon;
    return(/*#__PURE__*/ React.createElement("svg", _extends({
        viewBox: "0 0 1024 1024",
        width: "1em",
        height: "1em",
        fill: "none",
        stroke: "currentColor"
    }, props), /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement("style", null)), /*#__PURE__*/ React.createElement("path", {
        fill: "#007FFF",
        d: "M996.51 28.744 752.955 291.958a7.764 7.764 0 0 0-1.928 6.828 47.632 47.632 0 0 1-80.946 42.73L475.975 535.569l19.163 256.386 217.95 217.894L996.51 28.744z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#0069FF",
        d: "M993.591 35.352 752.68 295.702a7.82 7.82 0 0 0-1.927 6.884 47.081 47.081 0 0 1-80.12 42.18L479.884 535.513a3.855 3.855 0 0 0-1.101 2.974l18.832 251.815 485.79-732.869 10.186-22.026z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#00EED4",
        d: "m986.653 18.888-263.213 243.5a7.764 7.764 0 0 1-6.884 1.982 47.632 47.632 0 0 0-42.676 80.946L479.774 539.423l-256.33-19.273L5.494 302.255l981.16-283.367z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#00D3B4",
        d: "m980.045 21.806-260.46 240.912a7.764 7.764 0 0 1-6.773 1.927 47.081 47.081 0 0 0-42.18 80.12L479.829 535.514a3.855 3.855 0 0 1-3.028 1.101l-251.815-18.832L957.909 31.993l22.026-10.187z"
    })));
}
var IconLarkColor = /*#__PURE__*/ React.forwardRef(IconLarkColorComponent);
IconLarkColor.defaultProps = {
    isIcon: true
};
IconLarkColor.displayName = 'IconLarkColor';
export default IconLarkColor;
