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
function IconBgColorsComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-bg-colors")
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
        d: "m9.442 25.25 10.351 10.765a1 1 0 0 0 1.428.014L32 25.25H9.442Z"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M19 5.25 22.75 9m0 0 12.043 12.043a1 1 0 0 1 0 1.414L32 25.25M22.75 9 8.693 23.057a1 1 0 0 0-.013 1.4l.762.793m0 0 10.351 10.765a1 1 0 0 0 1.428.014L32 25.25m-22.558 0H32M6 42h36"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        stroke: "none",
        d: "M40.013 29.812 37.201 27l-2.812 2.812a4 4 0 1 0 5.624 0Z",
        clipRule: "evenodd"
    })));
}
var IconBgColors = /*#__PURE__*/ React.forwardRef(IconBgColorsComponent);
IconBgColors.defaultProps = {
    isIcon: true
};
IconBgColors.displayName = 'IconBgColors';
export default IconBgColors;
