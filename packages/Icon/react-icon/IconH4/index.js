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
function IconH4Component(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-h4")
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
        d: "M6 6v18m0 0v18m0-18h20m0 0V6m0 18v18m14.5-6H31v-1l8-15h1.5v16Zm0 0H44m-3.5 0v6"
    })));
}
var IconH4 = /*#__PURE__*/ React.forwardRef(IconH4Component);
IconH4.defaultProps = {
    isIcon: true
};
IconH4.displayName = 'IconH4';
export default IconH4;
