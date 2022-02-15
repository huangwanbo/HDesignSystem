import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconShakeComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-shake")
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
    d: "M43.092 27.536 31.778 38.849M20.465 4.91 9.15 16.221m9.192 14.85a1 1 0 1 1-1.414-1.415 1 1 0 0 1 1.414 1.414ZM6.323 28.95 19.05 41.678a1 1 0 0 0 1.415 0l21.213-21.213a1 1 0 0 0 0-1.415L28.95 6.322a1 1 0 0 0-1.415 0L6.322 27.536a1 1 0 0 0 0 1.414Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.637",
    cy: "30.364",
    r: "1",
    fill: "currentColor",
    stroke: "none",
    transform: "rotate(45 17.637 30.364)"
  }));
}

var IconShake = /*#__PURE__*/React.forwardRef(IconShakeComponent);
IconShake.defaultProps = {
  isIcon: true
};
IconShake.displayName = 'IconShake';
export default IconShake;