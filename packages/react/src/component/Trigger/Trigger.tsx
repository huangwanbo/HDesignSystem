import React, {
  useState,
  useRef,
  ReactNode,
  CSSProperties,
  useImperativeHandle,
} from "react";
import { PortalWrapper } from "../Portal";
import cls from "classNames";
const prefixCls = "ds-trigger";
export type positionType = "top" | "left" | "right" | "bottom";
export type TriggerRefType = {
  hide: () => void;
  show: () => void;
};
type TriggerProps = {
  position?: positionType;
  customStyle?: CSSProperties;
  wrapStyle?: CSSProperties;
  customClass?: string | string[];
  getContainer?: () => Element;
  children?: ReactNode;
  popupChildren?: ReactNode;
  autoAlignPopupWidth?: boolean;
  type?: "hover" | "click";
  hide?: () => void;
  show?: () => void;
};

type rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
};
const noop = () => {};
const Trigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const {
    children,
    position = "bottom",
    getContainer,
    popupChildren,
    customStyle,
    customClass,
    autoAlignPopupWidth,
    type = "hover",
    hide: propHide,
    show: propShow,
    wrapStyle,
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
  const childRef = useRef();
  let timmer: NodeJS.Timeout | null;
  const show = () => {
    if (timmer) clearTimeout(timmer);
    propShow && propShow();
    setVisible(true);
  };
  const hide = () => {
    if (timmer) clearTimeout(timmer);
    timmer = setTimeout(() => {
      propHide && propHide();
      setVisible(false);
    }, 100);
    setVisible(false);
    console.log("关闭", timmer);
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
  const handleShow = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    //if (e.target !== childRef.current) return;
    if (!childRef.current) return;
    const { left, top, bottom, right, height, width } = (
      childRef.current as HTMLElement
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
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });
  // 获取trigger对象的rect
  const getEventTargetSize = () => {
    return (
      childRef.current as HTMLElement | undefined
    )?.getBoundingClientRect();
  };
  const generateEvent = () => {
    const hasHover = type == "hover";
    return {
      onMouseEnter: hasHover ? handleShow : noop,
      onMouseLeave: hasHover ? onMouseLeave : noop,
      onClick: !hasHover ? handleShow : noop,
    };
  };
  const TriggerDom = (
    <PortalWrapper
      visible={visible}
      ref={portalRef}
      getContainer={getContainer}
    >
      <div
        role="trigger"
        className={cls(`${prefixCls}-container`, customClass)}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          ...customStyle,
        }}
      >
        <div
          className={`${prefixCls}-wrap`}
          style={{
            width:
              autoAlignPopupWidth && customStyle?.width === undefined
                ? getEventTargetSize()?.width
                : "",
            position: "absolute",
            ...popupStyle[position],
            ...wrapStyle,
          }}
          {...generateEvent()}
        >
          {popupChildren}
        </div>
      </div>
    </PortalWrapper>
  );
  const child = React.cloneElement(children as React.ReactElement, {
    ...generateEvent(),
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
