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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-gitlab")
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
        d: "M45.53 26.154 39.694 6.289v-.005c-.407-1.227-1.377-1.955-2.587-1.955-1.254 0-2.277.723-2.663 1.885L30.62 17.625H17.4l-3.825-11.41c-.386-1.163-1.41-1.886-2.663-1.886-1.237 0-2.276.792-2.592 1.96l-5.83 19.865a2.047 2.047 0 0 0 .724 2.18l19.741 14.807c.14.193.332.338.557.418l.461.343.455-.343c.263-.091.483-.252.638-.477L44.8 28.33a2.03 2.03 0 0 0 .728-2.175ZM36.84 6.932c.053-.096.155-.102.187-.102.06 0 .134.016.182.161l3.183 10.704H33.24l3.6-10.763Zm-26.11.054c.047-.14.122-.156.181-.156.145 0 .156.006.183.091L14.699 17.7H7.633l3.096-10.714ZM5.076 26.502l1.511-5.213 10.843 14.475-12.354-9.262Zm3.96-6.236h6.54l4.865 15.23-11.406-15.23Zm15.01 17.877-5.743-17.877h11.48l-5.737 17.877Zm8.459-17.877h6.402L27.642 35.31l4.864-15.043Zm-2.18 15.745L41.43 21.187l1.58 5.315-12.685 9.509Z"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconGitlab";
export default f;
