import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconLineHeightComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-line-height")
  });

  if (spin) {
    props.className = "".concat(props.className, " ").concat(prefixCls, "-loading");
  }

  delete props.spin;
  delete props.isIcon;
  return /*#__PURE__*/React.createElement("svg", _extends({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    viewBox: "0 0 48 48",
    width: "1em",
    height: "1em"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M4 8h14.5M33 8H18.5m0 0v34"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M39 9.5 37 13h4l-2-3.5ZM39 38.5 37 35h4l-2 3.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M39 13h2l-2-3.5-2 3.5h2Zm0 0v22m0 0h2l-2 3.5-2-3.5h2Z"
  }));
}

var IconLineHeight = /*#__PURE__*/React.forwardRef(IconLineHeightComponent);
IconLineHeight.defaultProps = {
  isIcon: true
};
IconLineHeight.displayName = 'IconLineHeight';
export default IconLineHeight;