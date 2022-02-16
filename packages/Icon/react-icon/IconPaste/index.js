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
function IconPasteComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-paste")
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
    }, props), /*#__PURE__*/ React.createElement("rect", {
        width: "24",
        height: "28",
        x: "8",
        y: "14",
        rx: "1"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M24 6h.01v.01H24V6ZM32 6h.01v.01H32V6ZM40 6h.01v.01H40V6ZM40 13h.01v.01H40V13ZM40 21h.01v.01H40V21Z"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M24 6h.01v.01H24V6ZM32 6h.01v.01H32V6ZM40 6h.01v.01H40V6ZM40 13h.01v.01H40V13ZM40 21h.01v.01H40V21Z"
    })));
}
var IconPaste = /*#__PURE__*/ React.forwardRef(IconPasteComponent);
IconPaste.defaultProps = {
    isIcon: true
};
IconPaste.displayName = 'IconPaste';
export default IconPaste;
