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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-arrow-rise")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M23.992 6.01a.01.01 0 0 1 .016 0l9.978 11.974a.01.01 0 0 1-.007.016H14.02a.01.01 0 0 1-.007-.016l9.978-11.975Z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "m24 6 10 12H14L24 6Z"
    }), c.createElement("path", {
        d: "M26 42H30V68H26z",
        transform: "rotate(-180 26 42)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M26 42H30V68H26z",
        transform: "rotate(-180 26 42)"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconArrowRise";
export default f;
