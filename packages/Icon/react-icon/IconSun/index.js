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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-sun")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("circle", {
        cx: "24",
        cy: "24",
        r: "7"
    }), c.createElement("path", {
        d: "M23 7H25V9H23z"
    }), c.createElement("path", {
        d: "M23 39H25V41H23z"
    }), c.createElement("path", {
        d: "M41 23H43V25H41z",
        transform: "rotate(90 41 23)"
    }), c.createElement("path", {
        d: "M9 23H11V25H9z",
        transform: "rotate(90 9 23)"
    }), c.createElement("path", {
        d: "M36.728 35.313H38.728V37.313H36.728z",
        transform: "rotate(135 36.728 35.313)"
    }), c.createElement("path", {
        d: "M14.1 12.687H16.1V14.687H14.1z",
        transform: "rotate(135 14.1 12.687)"
    }), c.createElement("path", {
        d: "M12.688 36.728H14.688V38.728H12.688z",
        transform: "rotate(-135 12.688 36.728)"
    }), c.createElement("path", {
        d: "M35.315 14.101H37.315V16.101H35.315z",
        transform: "rotate(-135 35.315 14.1)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M23 7H25V9H23z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M23 39H25V41H23z"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M41 23H43V25H41z",
        transform: "rotate(90 41 23)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M9 23H11V25H9z",
        transform: "rotate(90 9 23)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M36.728 35.313H38.728V37.313H36.728z",
        transform: "rotate(135 36.728 35.313)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M14.1 12.687H16.1V14.687H14.1z",
        transform: "rotate(135 14.1 12.687)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M12.688 36.728H14.688V38.728H12.688z",
        transform: "rotate(-135 12.688 36.728)"
    }), c.createElement("path", {
        fill: "currentColor",
        stroke: "none",
        d: "M35.315 14.101H37.315V16.101H35.315z",
        transform: "rotate(-135 35.315 14.1)"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconSun";
export default f;
