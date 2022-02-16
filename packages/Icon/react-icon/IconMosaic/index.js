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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-mosaic")
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
        d: "M6 7h4v4H6V7ZM6 23h4v4H6v-4ZM6 38h4v4H6v-4ZM14 15h4v4h-4v-4ZM14 31h4v4h-4v-4ZM22 7h4v4h-4V7ZM22 23h4v4h-4v-4ZM22 38h4v4h-4v-4ZM30 15h4v4h-4v-4ZM30 31h4v4h-4v-4ZM38 7h4v4h-4V7ZM38 23h4v4h-4v-4ZM38 38h4v4h-4v-4Z"
    }), c.createElement("path", {
        d: "M6 7h4v4H6V7ZM6 23h4v4H6v-4ZM6 38h4v4H6v-4ZM14 15h4v4h-4v-4ZM14 31h4v4h-4v-4ZM22 7h4v4h-4V7ZM22 23h4v4h-4v-4ZM22 38h4v4h-4v-4ZM30 15h4v4h-4v-4ZM30 31h4v4h-4v-4ZM38 7h4v4h-4V7ZM38 23h4v4h-4v-4ZM38 38h4v4h-4v-4Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconMosaic";
export default f;
