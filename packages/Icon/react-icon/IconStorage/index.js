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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-storage")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M7 18h34v12H7V18ZM40 6H8a1 1 0 0 0-1 1v11h34V7a1 1 0 0 0-1-1ZM7 30h34v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V30Z"
    }), c.createElement("path", {
        d: "M13.02 36H13v.02h.02V36Z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M13 12v-2h-2v2h2Zm.02 0h2v-2h-2v2Zm0 .02v2h2v-2h-2Zm-.02 0h-2v2h2v-2ZM13 14h.02v-4H13v4Zm-1.98-2v.02h4V12h-4Zm2-1.98H13v4h.02v-4Zm1.98 2V12h-4v.02h4Z"
    }), c.createElement("path", {
        d: "M13.02 24H13v.02h.02V24Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconStorage";
export default f;
