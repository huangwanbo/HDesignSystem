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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-google-circle-fill")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M32.571 33.526c-2.084 1.92-4.927 3.05-8.322 3.05a12.568 12.568 0 0 1-12.572-12.577A12.58 12.58 0 0 1 24.25 11.416a12.103 12.103 0 0 1 8.414 3.277L29.061 18.3a6.787 6.787 0 0 0-4.807-1.88c-3.277 0-6.045 2.213-7.037 5.186a7.567 7.567 0 0 0-.394 2.392c0 .833.144 1.638.394 2.391.992 2.973 3.763 5.187 7.032 5.187 1.696 0 3.133-.449 4.254-1.202a5.778 5.778 0 0 0 2.513-3.8h-6.767V21.71h11.844c.15.825.227 1.682.227 2.57 0 3.835-1.371 7.055-3.749 9.246ZM24 1A23 23 0 1 0 24 47 23 23 0 0 0 24 1Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconGoogleCircleFill";
export default f;
