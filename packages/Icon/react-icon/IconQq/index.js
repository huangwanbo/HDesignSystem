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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-qq")
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
        d: "M7.85 32.825s1.153 3.136 3.264 5.955c0 0-3.779 1.281-3.458 4.61 0 0-.128 3.714 8.069 3.458 0 0 5.764-.45 7.494-2.88h1.52c1.73 2.432 7.494 2.88 7.494 2.88 8.193.256 8.068-3.457 8.068-3.457.318-3.33-3.458-4.611-3.458-4.611 2.11-2.82 3.264-5.955 3.264-5.955 5.122 8.259 4.611-1.154 4.611-1.154-.96-5.57-4.995-9.221-4.995-9.221.576-5.058-1.537-5.955-1.537-5.955C37.742.844 24.26 1.12 23.978 1.126 23.694 1.12 10.21.846 9.767 16.495c0 0-2.113.897-1.537 5.955 0 0-4.034 3.65-4.995 9.221.005 0-.51 9.413 4.615 1.154Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconQq";
export default f;
