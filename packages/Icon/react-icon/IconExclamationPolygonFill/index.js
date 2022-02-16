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
function IconExclamationPolygonFillComponent(iconProps, ref) {
    var spin = iconProps.spin, className = iconProps.className;
    var props = _objectSpread({
        ref: ref
    }, iconProps, {
        className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-exclamation-polygon-fill")
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
        fillRule: "evenodd",
        stroke: "none",
        d: "M15.553 4a1 1 0 0 0-.74.327L4.26 15.937a1 1 0 0 0-.26.672V31.39a1 1 0 0 0 .26.673l10.553 11.609a1 1 0 0 0 .74.327h16.893a1 1 0 0 0 .74-.327l10.554-11.61a1 1 0 0 0 .26-.672V16.61a1 1 0 0 0-.26-.673L33.187 4.327a1 1 0 0 0-.74-.327H15.553ZM22 33a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
        clipRule: "evenodd"
    })));
}
var IconExclamationPolygonFill = /*#__PURE__*/ React.forwardRef(IconExclamationPolygonFillComponent);
IconExclamationPolygonFill.defaultProps = {
    isIcon: true
};
IconExclamationPolygonFill.displayName = 'IconExclamationPolygonFill';
export default IconExclamationPolygonFill;
