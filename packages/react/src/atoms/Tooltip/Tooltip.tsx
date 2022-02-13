import React, { useState, useRef } from "react";
import { PortalWrapper } from "../Portal";
const prefixCls = "ds-tooltip";
type positionType = "top" | "left" | "right" | "bottom";
type TooltipProps = {
  title: string;
  position: positionType;
  customStyle?: React.CSSProperties;
  customClass?: string;
} & React.AnchorHTMLAttributes<any>;

type rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
};

const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const { children, title } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [transform, setTransform] = useState<rect>({
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
  const tooltipDOM = (
    <PortalWrapper visible={visible} ref={portalRef}>
      <div
        ref={ref}
        role="tooltip"
        className={`${prefixCls}-container`}
        style={{
          width: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${transform.left}px`,
            top: `${transform.top - transform.height - 15}px`,
            transformOrigin: `${transform.width}px 0px 0px`,
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className={`${prefixCls}-inner`}>{title}</div>
          <div className={`${prefixCls}-arrow`} />
        </div>
      </div>
    </PortalWrapper>
  );
  const onMouseEnter = (e: MouseEvent) => {
    const { left, top, bottom, right, height, width } = (
      e.target as HTMLElement
    ).getBoundingClientRect();
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
    hide();
  };
  const child = React.cloneElement(children as React.ReactElement, {
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    ref: childRef,
  });
  return (
    <>
      {child}
      {visible && tooltipDOM}
    </>
  );
});
Tooltip.displayName = "Tooltip";
export default Tooltip;
