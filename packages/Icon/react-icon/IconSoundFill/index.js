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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-sound-fill")
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
        d: "m14 15 10-7v32l-10-7H6V15h8Z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M24.924 6.226A2 2 0 0 1 26 8v32a2 2 0 0 1-3.147 1.639L13.37 35H6a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h7.37l9.483-6.638a2 2 0 0 1 2.07-.136ZM35.314 35.042c6.248-6.249 6.248-16.38 0-22.628l2.828-2.828c7.81 7.81 7.81 20.474 0 28.284l-2.828-2.828Z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M29.657 29.728a8 8 0 0 0 0-11.314l2.828-2.828c4.687 4.686 4.687 12.284 0 16.97l-2.828-2.828Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconSoundFill";
export default f;
