import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconSkipPreviousFillComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-skip-previous-fill")
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
    fill: "currentColor",
    stroke: "none",
    d: "M34.414 35.855a1 1 0 0 0 1.586-.81v-22.09a1 1 0 0 0-1.586-.81L19.122 23.19a1 1 0 0 0 0 1.622l15.292 11.044Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    fillRule: "evenodd",
    stroke: "none",
    d: "M15 12a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h2Z",
    clipRule: "evenodd"
  }));
}

var IconSkipPreviousFill = /*#__PURE__*/React.forwardRef(IconSkipPreviousFillComponent);
IconSkipPreviousFill.defaultProps = {
  isIcon: true
};
IconSkipPreviousFill.displayName = 'IconSkipPreviousFill';
export default IconSkipPreviousFill;