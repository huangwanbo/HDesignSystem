import React, { useState, useRef } from 'react';
import 'react-dom';
import PortalWrapper from '../Portal/PortalWrapper.js';
import cls from 'classNames';

const prefixCls = "ds-tooltip";
const Tooltip = React.forwardRef((props, ref) => {
    const { children, title, position = "top" } = props;
    const [visible, setVisible] = useState(false);
    const [transform, setTransform] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 0,
        width: 0,
    });
    const portalRef = useRef(null);
    const childRef = ref || React.createRef();
    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        // setVisible(false);
    };
    const popupStyle = {
        top: {
            left: `${transform.left}px`,
            top: `${transform.top - transform.height - 15}px`,
            transformOrigin: `${transform.width}px 0px 0px`,
        },
        bottom: {
            left: `${transform.left}px`,
            top: `${transform.top + 25}px`,
            transformOrigin: `${transform.width}px 0px 0px`,
        },
        left: {
            left: `${transform.left - transform.width - 15}px`,
            top: `${transform.top}px`,
            transformOrigin: `${transform.width}px 0px 0px`,
        },
        right: {
            left: `${transform.left + transform.width + 15}px`,
            top: `${transform.top - transform.height / 2}px`,
            transformOrigin: `${transform.width}px 0px 0px`,
        },
    };
    console.log(popupStyle[position], position);
    const tooltipDOM = (React.createElement(PortalWrapper, { visible: visible, ref: portalRef },
        React.createElement("div", { ref: ref, role: "tooltip", className: `${prefixCls}-container`, style: {
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
            } },
            React.createElement("div", { style: {
                    position: "absolute",
                    ...popupStyle[position],
                }, onMouseEnter: show, onMouseLeave: hide },
                React.createElement("div", { className: `${prefixCls}-inner` }, title),
                React.createElement("div", { className: cls(`${prefixCls}-arrow`, `${prefixCls}-arrow-${position}`) })))));
    const onMouseEnter = (e) => {
        const { left, top, bottom, right, height, width } = e.target.getBoundingClientRect();
        console.log({
            left,
            top,
            bottom,
            right,
            height,
            width,
        });
        setTransform({
            left,
            top,
            bottom,
            right,
            height,
            width,
        });
        show();
    };
    const onMouseLeave = () => {
    };
    const child = React.cloneElement(children, {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        ref: childRef,
    });
    return (React.createElement(React.Fragment, null,
        child,
        visible && tooltipDOM));
});
Tooltip.displayName = "Tooltip";

export { Tooltip as default };
//# sourceMappingURL=Tooltip.js.map
