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
function IconBytedanceColorComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-bytedance-color")
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
        fill: "#325AB4",
        d: "M280.416 794.112 128 829.952v-636.32l152.416 35.84z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#78E6DC",
        d: "M928 828.48 800 864V160l128 35.52z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#3C8CFF",
        d: "M480 798.304 352 832V480l128 33.696z"
    }), /*#__PURE__*/ React.createElement("path", {
        fill: "#00C8D2",
        d: "M576 449.696 704 416v352l-128-33.696z"
    })));
}
var IconBytedanceColor = /*#__PURE__*/ React.forwardRef(IconBytedanceColorComponent);
IconBytedanceColor.defaultProps = {
    isIcon: true
};
IconBytedanceColor.displayName = 'IconBytedanceColor';
export default IconBytedanceColor;
