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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-dice")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("rect", {
        width: "34",
        height: "34",
        x: "6.998",
        y: "7",
        rx: "1.5"
    }), c.createElement("circle", {
        cx: "16",
        cy: "16",
        r: "2"
    }), c.createElement("circle", {
        cx: "24",
        cy: "24",
        r: "2"
    }), c.createElement("circle", {
        cx: "16",
        cy: "32",
        r: "2"
    }), c.createElement("circle", {
        cx: "32",
        cy: "16",
        r: "2"
    }), c.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "2"
    }), c.createElement("circle", {
        cx: "16",
        cy: "16",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), c.createElement("circle", {
        cx: "24",
        cy: "24",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), c.createElement("circle", {
        cx: "16",
        cy: "32",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), c.createElement("circle", {
        cx: "32",
        cy: "16",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }), c.createElement("circle", {
        cx: "32",
        cy: "32",
        r: "2",
        fill: "currentColor",
        stroke: "none"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconDice";
export default f;
