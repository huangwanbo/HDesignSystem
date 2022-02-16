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
        className: "".concat(i ? i + " " : "").concat(e, " ").concat(e, "-ordered-list")
    });
    return h && (j.className = "".concat(j.className, " ").concat(e, "-loading")), delete j.spin, delete j.isIcon, c.createElement("svg", b({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        viewBox: "0 0 48 48",
        width: "1em",
        height: "1em"
    }, j), c.createElement("path", {
        d: "M13 24h30M13 37h30M13 11h30"
    }), c.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        stroke: "none",
        d: "M5.578 13.06v1.695h5.041V13.06H9.164V7.555H7.748L5.255 8.968l.763 1.513 1.114-.636v3.215H5.578ZM5.37 26.205v1.49h5.07V26H7.964l.94-.94c.454-.44.783-.86.982-1.258.199-.404.298-.826.298-1.266 0-.686-.224-1.225-.683-1.6-.45-.372-1.093-.55-1.912-.55-.473 0-.933.072-1.38.214a3.63 3.63 0 0 0-1.133.582l-.066.053.652 1.533.113-.085c.263-.199.524-.345.783-.44.266-.094.524-.141.774-.141.309 0 .52.06.652.165.128.1.198.252.198.477 0 .177-.05.356-.154.54l-.001.002c-.099.186-.274.416-.528.69L5.37 26.205ZM10.381 38.344c0-.443-.118-.826-.358-1.145a1.702 1.702 0 0 0-.713-.56 1.652 1.652 0 0 0 .586-.52 1.73 1.73 0 0 0 .307-1.022c0-.404-.108-.763-.327-1.074a2.076 2.076 0 0 0-.918-.71c-.386-.166-.833-.247-1.34-.247-.48 0-.952.071-1.417.213-.459.134-.836.318-1.127.554l-.065.053.652 1.486.11-.076c.275-.193.563-.34.863-.442h.002c.3-.109.581-.162.844-.162.266 0 .454.065.579.18l.004.002c.128.107.198.262.198.48 0 .201-.07.33-.197.412-.138.089-.376.141-.733.141h-1.01v1.626h1.188c.371 0 .614.056.75.15.127.085.2.23.2.463 0 .254-.078.412-.21.503l-.002.002c-.136.097-.386.157-.777.157-.595 0-1.194-.199-1.8-.605l-.11-.073-.65 1.483.064.053c.285.236.662.424 1.127.565h.002c.465.136.95.203 1.456.203.852 0 1.538-.178 2.045-.546.517-.377.777-.896.777-1.544Z",
        clipRule: "evenodd"
    }));
});
f.defaultProps = {
    isIcon: !0
}, f.displayName = "IconOrderedList";
export default f;
