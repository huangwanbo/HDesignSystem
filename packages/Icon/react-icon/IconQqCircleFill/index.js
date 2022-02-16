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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-qq-circle-fill")
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
        d: "M24.007 1C11.281 1 1 11.281 1 24.007c0 13.23 11.216 23.87 24.733 22.936 11.288-.791 20.49-9.994 21.21-21.354C47.877 12.144 37.237 1 24.007 1Zm11.36 29.262s-.79 2.23-2.3 4.242c0 0 2.66.935 2.444 3.236 0 0 .072 2.66-5.68 2.444 0 0-4.026-.287-5.248-2.013h-1.079c-1.222 1.726-5.248 2.013-5.248 2.013-5.752.216-5.68-2.444-5.68-2.444-.216-2.373 2.444-3.236 2.444-3.236-1.51-2.013-2.3-4.241-2.3-4.241-3.596 5.895-3.236-.791-3.236-.791.647-3.955 3.523-6.543 3.523-6.543-.431-3.595 1.078-4.242 1.078-4.242.216-11.072 9.707-10.929 9.922-10.929.216 0 9.707-.215 9.994 10.929 0 0 1.51.647 1.079 4.242 0 0 2.876 2.588 3.523 6.543 0 0 .36 6.686-3.236.79Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconQqCircleFill";
export default f;
