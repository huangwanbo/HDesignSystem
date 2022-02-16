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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-skip-previous-fill")
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
        d: "M34.414 35.855a1 1 0 0 0 1.586-.81v-22.09a1 1 0 0 0-1.586-.81L19.122 23.19a1 1 0 0 0 0 1.622l15.292 11.044Z"
    }), c.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        stroke: "none",
        d: "M15 12a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h2Z",
        clipRule: "evenodd"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconSkipPreviousFill";
export default f;
