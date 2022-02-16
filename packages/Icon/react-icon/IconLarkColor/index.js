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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-lark-color")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        viewBox: "0 0 1024 1024",
        width: "1em",
        height: "1em",
        fill: "none",
        stroke: "currentColor"
    }, j), c.createElement("defs", null, c.createElement("style", null)), c.createElement("path", {
        fill: "#007FFF",
        d: "M996.51 28.744 752.955 291.958a7.764 7.764 0 0 0-1.928 6.828 47.632 47.632 0 0 1-80.946 42.73L475.975 535.569l19.163 256.386 217.95 217.894L996.51 28.744z"
    }), c.createElement("path", {
        fill: "#0069FF",
        d: "M993.591 35.352 752.68 295.702a7.82 7.82 0 0 0-1.927 6.884 47.081 47.081 0 0 1-80.12 42.18L479.884 535.513a3.855 3.855 0 0 0-1.101 2.974l18.832 251.815 485.79-732.869 10.186-22.026z"
    }), c.createElement("path", {
        fill: "#00EED4",
        d: "m986.653 18.888-263.213 243.5a7.764 7.764 0 0 1-6.884 1.982 47.632 47.632 0 0 0-42.676 80.946L479.774 539.423l-256.33-19.273L5.494 302.255l981.16-283.367z"
    }), c.createElement("path", {
        fill: "#00D3B4",
        d: "m980.045 21.806-260.46 240.912a7.764 7.764 0 0 1-6.773 1.927 47.081 47.081 0 0 0-42.18 80.12L479.829 535.514a3.855 3.855 0 0 1-3.028 1.101l-251.815-18.832L957.909 31.993l22.026-10.187z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconLarkColor";
export default f;
