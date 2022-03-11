import React, { useState, useRef, ReactNode } from "react";
import { PortalWrapper } from "../Portal";
import cls from "classNames";
const prefixCls = "ds-trigger";
export type positionType = "top" | "left" | "right" | "bottom";
type TriggerProps = {
  position?: positionType;
  customStyle?: React.CSSProperties;
  customClass?: string | string[];
  getContainer?: () => Element;
  children?: ReactNode;
  popupChildren?: ReactNode;
};

type rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
};

const Trigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const {
    children,
    position = "bottom",
    getContainer,
    popupChildren,
    customStyle,
    customClass,
  } = props;
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
  let timmer: NodeJS.Timeout | null;
  const show = () => {
    if (timmer) clearTimeout(timmer);
    setVisible(true);
  };
  const hide = () => {
    if (timmer) clearTimeout(timmer);
    timmer = setTimeout(() => {
      setVisible(false);
    }, 100);
  };
  const popupStyle = {
    top: {
      left: `${transform.left}px`,
      top: `${transform.top - transform.height - 15}px`,
      transformOrigin: `${transform.width}px 0px 0px`,
    },
    bottom: {
      left: `${transform.left}px`,
      top: `${transform.top + transform.height + 5}px`,
      transformOrigin: `${transform.width}px 0px 0px`,
    },
    left: {
      left: `${transform.left - transform.width - 15}px`,
      top: `${transform.top}px`,
      transformOrigin: `${transform.width}px 0px 0px`,
    },
    right: {
      left: `${transform.left + transform.width + 5}px`,
      top: `${transform.top}px`,
      transformOrigin: `${transform.right}px 0px 0px`,
    },
  };
  const onMouseEnter = (e: any) => {
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

  const TriggerDom = (
    <PortalWrapper
      visible={visible}
      ref={portalRef}
      getContainer={getContainer}
    >
      <div
        ref={ref}
        role="trigger"
        className={cls(`${prefixCls}-container`, customClass)}
        style={{
          //width: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          ...customStyle,
        }}
      >
        <div
          className={`${prefixCls}-wrap`}
          style={{
            position: "absolute",
            ...popupStyle[position],
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {popupChildren}
        </div>
      </div>
    </PortalWrapper>
  );
  const child = React.cloneElement(children as React.ReactElement, {
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    ref: childRef,
  });

  return (
    <>
      {child}
      {visible && TriggerDom}
    </>
  );
});
Trigger.displayName = "Trigger";
export default Trigger;
