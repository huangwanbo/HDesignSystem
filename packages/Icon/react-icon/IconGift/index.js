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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-gift")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M13.45 14.043H8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4.893m-21.657 0c-1.036-2.833-.615-5.6 1.182-6.637 2.152-1.243 5.464.464 7.397 3.812.539.933.914 1.896 1.127 2.825m-9.706 0h9.706m0 0H25.4m0 0a10.31 10.31 0 0 1 1.128-2.825c1.933-3.348 5.244-5.055 7.397-3.812 1.797 1.037 2.217 3.804 1.182 6.637m-9.707 0h9.707M10 26.043a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-13Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconGift";
export default f;
