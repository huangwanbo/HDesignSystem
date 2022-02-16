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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-file-pdf")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M11 42h26a2 2 0 0 0 2-2V13.828a2 2 0 0 0-.586-1.414l-5.828-5.828A2 2 0 0 0 31.172 6H11a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2Z"
    }), c.createElement("path", {
        d: "M22.305 21.028c.874 1.939 3.506 6.265 4.903 8.055 1.747 2.237 3.494 2.685 4.368 2.237.873-.447 1.21-4.548-7.425-2.685-7.523 1.623-7.424 3.58-6.988 4.476.728 1.193 2.522 2.627 5.678-6.266C25.699 18.79 24.489 17 23.277 17c-1.409 0-2.538.805-.972 4.028Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconFilePdf";
export default f;
