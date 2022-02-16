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
function IconIdcardComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-idcard")
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
        d: "M11 17h9m-9 7h9m-9 7h5m-8 9h32a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2Z"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M36 33a7 7 0 1 0-14 0"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "29",
        cy: "20",
        r: "4"
    })));
}
var IconIdcard = /*#__PURE__*/ React.forwardRef(IconIdcardComponent);
IconIdcard.defaultProps = {
    isIcon: true
};
IconIdcard.displayName = 'IconIdcard';
export default IconIdcard;
