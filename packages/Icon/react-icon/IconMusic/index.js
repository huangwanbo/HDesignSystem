function a(a, b, c) {
    return b in a ? Object.defineProperty(a, b, {
        value: c,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[b] = c, a;
}
function b() {
    return (b = Object.assign || function(a) {
        for(var c = 1; c < arguments.length; c++){
            var d = arguments[c];
            for(var b in d)Object.prototype.hasOwnProperty.call(d, b) && (a[b] = d[b]);
        }
        return a;
    }).apply(this, arguments);
}
import c, { useContext as d } from "react";
var e = "ds-icon", f = c.forwardRef(function(f, g) {
    var h = f.spin, i = f.className, j = function(a) {
        for(var c = 1; c < arguments.length; c++){
            var d = null != arguments[c] ? arguments[c] : {}, h = Object.keys(d);
            "function" == typeof Object.getOwnPropertySymbols && (h = h.concat(Object.getOwnPropertySymbols(d).filter(function(a) {
                return Object.getOwnPropertyDescriptor(d, a).enumerable;
            }))), h.forEach(function(b) {
                a(a, b, d[b]);
            });
        }
        return a;
    }({
        ref: g
    }, f, {
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-music")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M15 37a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0V18.5M41 37a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0V16.5m-26 2V9.926a1 1 0 0 1 .923-.997l24-1.846A1 1 0 0 1 41 8.08v8.42m-26 2 26-2"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconMusic";
export default f;
