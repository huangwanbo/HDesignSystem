import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconSubscribedComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-subscribed")
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
    d: "m31.289 15.596-9.193 9.193-4.95-4.95M24 34l14.706 7.843a.2.2 0 0 0 .294-.176V7a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v34.667a.2.2 0 0 0 .294.176L24 34Z"
  }));
}

var IconSubscribed = /*#__PURE__*/React.forwardRef(IconSubscribedComponent);
IconSubscribed.defaultProps = {
  isIcon: true
};
IconSubscribed.displayName = 'IconSubscribed';
export default IconSubscribed;