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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-twitter-circle-fill")
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
        d: "M24 1C11.296 1 1 11.297 1 24s10.296 23 23 23c12.703 0 23-10.297 23-23S36.703 1 24 1Zm11.698 18.592c-.13 9.818-6.408 16.542-15.78 16.965-3.864.176-6.664-1.072-9.1-2.62 2.855.456 6.397-.686 8.292-2.307-2.8-.273-4.458-1.698-5.233-3.991.808.14 1.66.103 2.43-.06-2.527-.846-4.331-2.407-4.424-5.68.709.323 1.448.626 2.43.686-1.891-1.075-3.29-5.007-1.688-7.607 2.806 3.076 6.182 5.586 11.724 5.926-1.391-5.949 6.492-9.175 9.791-5.177 1.395-.27 2.53-.799 3.622-1.374-.45 1.381-1.315 2.347-2.37 3.119 1.158-.157 2.184-.44 3.06-.872-.544 1.128-1.732 2.14-2.754 2.992Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconTwitterCircleFill";
export default f;
