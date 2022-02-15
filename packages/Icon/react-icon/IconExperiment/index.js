import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconExperimentComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-experiment")
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
    d: "M10.5 7h6m0 0v10.5l-5.25 14M16.5 7h15m0 0h6m-6 0v10.5L37 32.167M11.25 31.5l-2.344 6.853A2 2 0 0 0 10.8 41h26.758a2 2 0 0 0 1.86-2.737L37 32.167M11.25 31.5c1.916 1.833 7.05 4.4 12.25 0s11.166-1.389 13.5.667M26 22.5v.01"
  }));
}

var IconExperiment = /*#__PURE__*/React.forwardRef(IconExperimentComponent);
IconExperiment.defaultProps = {
  isIcon: true
};
IconExperiment.displayName = 'IconExperiment';
export default IconExperiment;