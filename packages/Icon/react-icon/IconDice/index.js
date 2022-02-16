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
function IconDiceComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-dice")
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
        width: "34",
        height: "34",
        x: "6.998",
        y: "7",
        rx: "1.5"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "16",
        cy: "16",
        r: "2"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "24",
        cy: "24",
        r: "2"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "16",
        cy: "32",
        r: "2"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "32",
        cy: "16",
        r: "2"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "2"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "16",
        cy: "16",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "24",
        cy: "24",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "16",
        cy: "32",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "32",
        cy: "16",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    })));
}
var IconDice = /*#__PURE__*/ React.forwardRef(IconDiceComponent);
IconDice.defaultProps = {
    isIcon: true
};
IconDice.displayName = 'IconDice';
export default IconDice;
