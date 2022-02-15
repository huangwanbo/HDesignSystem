import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { useContext } from 'react';
var prefixCls = 'ds-icon';

function IconMusicComponent(iconProps, ref) {
  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, " ").concat(prefixCls, "-music")
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
    d: "M15 37a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0V18.5M41 37a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0V16.5m-26 2V9.926a1 1 0 0 1 .923-.997l24-1.846A1 1 0 0 1 41 8.08v8.42m-26 2 26-2"
  }));
}

var IconMusic = /*#__PURE__*/React.forwardRef(IconMusicComponent);
IconMusic.defaultProps = {
  isIcon: true
};
IconMusic.displayName = 'IconMusic';
export default IconMusic;