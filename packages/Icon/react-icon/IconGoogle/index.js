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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-google")
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
        d: "M23.997 21.054h19.42a19.46 19.46 0 0 1 .321 3.428c0 3.875-.812 7.335-2.437 10.38-1.625 3.044-3.942 5.424-6.951 7.138-3.01 1.714-6.46 2.572-10.353 2.572-2.803 0-5.473-.54-8.009-1.621-2.535-1.08-4.723-2.54-6.562-4.38-1.84-1.839-3.3-4.026-4.38-6.562A20.223 20.223 0 0 1 3.426 24c0-2.803.54-5.473 1.62-8.009 1.08-2.535 2.54-4.723 4.38-6.562 1.84-1.84 4.027-3.3 6.562-4.38a20.223 20.223 0 0 1 8.01-1.62c5.356 0 9.955 1.794 13.794 5.384l-5.598 5.384c-2.197-2.125-4.929-3.188-8.197-3.188-2.303 0-4.433.58-6.388 1.741a12.83 12.83 0 0 0-4.648 4.728c-1.142 1.99-1.714 4.165-1.714 6.522s.572 4.531 1.714 6.523a12.83 12.83 0 0 0 4.648 4.727c1.955 1.16 4.085 1.741 6.388 1.741 1.554 0 2.982-.214 4.286-.643 1.303-.428 2.375-.964 3.214-1.607a11.63 11.63 0 0 0 2.197-2.196c.625-.822 1.084-1.598 1.38-2.33a9.84 9.84 0 0 0 .602-2.09H23.997v-7.071Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconGoogle";
export default f;
