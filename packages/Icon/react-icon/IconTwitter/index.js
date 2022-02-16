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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-twitter")
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
        d: "M43.277 13.575c0 16.613-10.912 28.575-26.962 29.1-6.788.525-11.438-1.537-15.6-4.65 4.65.525 10.912-1.012 13.987-4.163-4.65 0-7.275-2.625-8.812-6.187h4.162C5.89 26.1 2.74 22.987 2.74 17.812c1.012.525 2.062 1.013 4.162 1.013-3.637-2.063-5.7-8.813-3.112-12.975 4.65 5.175 10.35 9.863 19.762 10.35C20.927 5.85 34.465.6 40.165 7.388c2.625-.525 4.162-1.538 6.187-2.625-.525 2.625-2.062 4.162-4.162 5.175 2.062 0 3.637-.525 5.175-1.538-.488 2.063-2.55 4.162-4.088 5.175Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconTwitter";
export default f;
