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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-github")
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
        d: "M.056 24.618c0 10.454 6.7 19.344 16.038 22.608 1.259.32 1.067-.582 1.067-1.19v-4.148c-7.265.853-7.553-3.957-8.043-4.758-.987-1.686-3.312-2.112-2.62-2.912 1.654-.853 3.34.213 5.291 3.1 1.413 2.09 4.166 1.738 5.562 1.385a6.777 6.777 0 0 1 1.856-3.253C11.687 34.112 8.55 29.519 8.55 24.057c0-2.646.874-5.082 2.586-7.045-1.088-3.243.102-6.01.26-6.422 3.11-.282 6.337 2.225 6.587 2.421 1.766-.474 3.782-.73 6.038-.73 2.266 0 4.293.26 6.069.74.603-.458 3.6-2.608 6.49-2.345.155.41 1.317 3.12.294 6.315 1.734 1.968 2.62 4.422 2.62 7.077 0 5.472-3.158 10.07-10.699 11.397a6.82 6.82 0 0 1 2.037 4.875v6.02c.042.48 0 .96.806.96 9.477-3.194 16.299-12.15 16.299-22.697C47.938 11.396 37.218.68 23.996.68 10.77.675.055 11.391.055 24.617l.001.001Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconGithub";
export default f;
