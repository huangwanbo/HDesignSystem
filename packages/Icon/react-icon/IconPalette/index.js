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
function IconPaletteComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-palette")
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
        strokeLineJoin: "round",
        d: "M31.813 12.02C29.73 10.459 27.013 10 24 10c-9.78 0-17.708 6.987-17.708 15.042 0 8.054 8.97 14.583 18.75 14.583 5.277 0 2.485-5.318 5.73-8.333 2.767-2.574 10.937-1.563 10.937-6.25 0-2.792-.521-5.209-2.605-7.617"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M25.042 25.563 42.23 8.375"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "22.5",
        cy: "17.5",
        r: "2.5",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "15.5",
        cy: "20.5",
        r: "2.5",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "14.5",
        cy: "28.5",
        r: "2.5",
        fill: "currentColor",
        stroke: "none"
    })));
}
var IconPalette = /*#__PURE__*/ React.forwardRef(IconPaletteComponent);
IconPalette.defaultProps = {
    isIcon: true
};
IconPalette.displayName = 'IconPalette';
export default IconPalette;
