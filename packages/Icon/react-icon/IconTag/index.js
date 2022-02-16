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
function IconTagComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-tag")
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
        d: "M24.835 6.035a1 1 0 0 1 .903-.273l12.964 2.592a1 1 0 0 1 .784.785l2.593 12.963a1 1 0 0 1-.274.904L21.678 43.133a1 1 0 0 1-1.415 0L4.708 27.577a1 1 0 0 1 0-1.414L24.835 6.035Z"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M31.577 17.346a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M31.582 17.349a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
    })));
}
var IconTag = /*#__PURE__*/ React.forwardRef(IconTagComponent);
IconTag.defaultProps = {
    isIcon: true
};
IconTag.displayName = 'IconTag';
export default IconTag;
