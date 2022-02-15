import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconSunComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-sun")
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
  }, props), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 7H25V9H23z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 39H25V41H23z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M41 23H43V25H41z",
    transform: "rotate(90 41 23)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 23H11V25H9z",
    transform: "rotate(90 9 23)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M36.728 35.313H38.728V37.313H36.728z",
    transform: "rotate(135 36.728 35.313)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.1 12.687H16.1V14.687H14.1z",
    transform: "rotate(135 14.1 12.687)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.688 36.728H14.688V38.728H12.688z",
    transform: "rotate(-135 12.688 36.728)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M35.315 14.101H37.315V16.101H35.315z",
    transform: "rotate(-135 35.315 14.1)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M23 7H25V9H23z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M23 39H25V41H23z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M41 23H43V25H41z",
    transform: "rotate(90 41 23)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M9 23H11V25H9z",
    transform: "rotate(90 9 23)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M36.728 35.313H38.728V37.313H36.728z",
    transform: "rotate(135 36.728 35.313)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M14.1 12.687H16.1V14.687H14.1z",
    transform: "rotate(135 14.1 12.687)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M12.688 36.728H14.688V38.728H12.688z",
    transform: "rotate(-135 12.688 36.728)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M35.315 14.101H37.315V16.101H35.315z",
    transform: "rotate(-135 35.315 14.1)"
  }));
}

var IconSun = /*#__PURE__*/React.forwardRef(IconSunComponent);
IconSun.defaultProps = {
  isIcon: true
};
IconSun.displayName = 'IconSun';
export default IconSun;