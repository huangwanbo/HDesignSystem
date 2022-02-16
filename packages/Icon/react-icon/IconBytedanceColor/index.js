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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-bytedance-color")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        viewBox: "0 0 1024 1024",
        width: "1em",
        height: "1em",
        fill: "none",
        stroke: "currentColor"
    }, j), c.createElement("defs", null, c.createElement("style", null)), c.createElement("path", {
        fill: "#325AB4",
        d: "M280.416 794.112 128 829.952v-636.32l152.416 35.84z"
    }), c.createElement("path", {
        fill: "#78E6DC",
        d: "M928 828.48 800 864V160l128 35.52z"
    }), c.createElement("path", {
        fill: "#3C8CFF",
        d: "M480 798.304 352 832V480l128 33.696z"
    }), c.createElement("path", {
        fill: "#00C8D2",
        d: "M576 449.696 704 416v352l-128-33.696z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconBytedanceColor";
export default f;
