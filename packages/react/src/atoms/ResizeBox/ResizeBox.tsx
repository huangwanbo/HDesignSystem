import React, {
  ReactNode,
  CSSProperties,
  useState,
  useRef,
  forwardRef,
} from "react";
import ResizeTrigger from "./ResizeTrigger";
import cls from "classNames";
import { on, off } from "../../_util/event";
const perfixCls = "ds-resize-box";
export type directionType = "left" | "right" | "top" | "bottom";
type recordRefType = {
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  direction: directionType;
  moving: boolean;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};
type ResizeBoxProps = {
  className?: string | string[];
  style?: CSSProperties;
  children?: ReactNode;
  directions?: Array<directionType>;
  width?: number;
  height?: number;
  onMovingStart?: () => void;
  onMoving?: (e: MouseEvent, size: { width: number; height: number }) => void;
  onMovingEnd?: () => void;
};
function ResizeBox(props: ResizeBoxProps, ref: any) {
  const {
    directions = ["right"],
    children,
    className,
    style,
    width: propWidth,
    height: propHeight,
    onMovingStart,
    onMoving,
    onMovingEnd,
  } = props;
  const [width, setWidth] = useState(propWidth);
  const [height, setHeight] = useState(propHeight);
  const wrappeRef = ref || useRef<React.RefObject<HTMLElement>>();
  const recordRef = useRef<recordRefType>({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    direction: "right",
    moving: false,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  function getDirection(direction: directionType) {
    if (direction === "left" || direction === "right") {
      return "vertical";
    } else {
      return "horizontal";
    }
  }
  function getRectContent(clientSize: number, padding: number) {
    const res = clientSize - padding;
    return clientSize === 0 ? 0 : res <= 0 ? 0 : res;
  }
  /*
    https://github.com/arco-design/arco-design/blob/main/components/ResizeBox/index.tsx
  */
  function onTriggerMouseDown(direction: directionType, e: React.MouseEvent) {
    onMovingStart && onMovingStart();
    recordRef.current.moving = true;
    recordRef.current.startX = e.pageX;
    recordRef.current.startY = e.pageY;
    recordRef.current.direction = direction;

    const { top, left, right, bottom } = recordRef.current.padding;
    recordRef.current.startWidth = getRectContent(
      wrappeRef.current?.clientWidth,
      left + right
    );
    recordRef.current.startHeight = getRectContent(
      wrappeRef.current?.clientHeight,
      top + bottom
    );

    on(document.body, "mousemove", moving);
    on(document.body, "touchmove", moving);
    on(document.body, "mouseup", moveEnd);
    on(document.body, "touchend", moveEnd);
    on(document.body, "contextmenu", moveEnd);

    document.body.style.cursor =
      getDirection(direction) == "horizontal" ? "row-resize" : "col-resize";
  }
  function moving(e: MouseEvent) {
    if (!recordRef.current.moving) return false;
    const { startX, startY, startWidth, startHeight } = recordRef.current;
    let newWidth = startWidth;
    let newHeight = startHeight;

    const offsetX = e.pageX - startX;
    const offsetY = e.pageY - startY;

    switch (recordRef.current.direction) {
      case "left":
        newWidth = startWidth - offsetX;
        setWidth(newWidth);
        break;
      case "right":
        newWidth = startWidth + offsetX;
        setWidth(newWidth);
        break;
      case "top":
        newHeight = startHeight - offsetY;
        setHeight(newHeight);
        break;
      case "bottom":
        newHeight = startHeight + offsetY;
        setHeight(newHeight);
        break;
    }
    onMoving &&
      onMoving(e, {
        width: newWidth,
        height: newHeight,
      });
    return true;
  }

  function moveEnd() {
    recordRef.current.moving = false;
    offEvents();
    document.body.style.cursor = "default";
    onMovingEnd && onMovingEnd();
  }

  function offEvents() {
    off(document.body, "mousemove", moving);
    off(document.body, "touchmove", moving);
    off(document.body, "mouseup", moveEnd);
    off(document.body, "touchend", moveEnd);
    off(document.body, "contextmenu", moveEnd);
  }
  const wrapperStyle = {
    width: width + "px",
    height: height + "px",
    ...style,
  };
  return (
    <div
      className={cls(perfixCls, className)}
      style={wrapperStyle}
      ref={wrappeRef}
    >
      {children}
      {directions.map((direction) => {
        return (
          <ResizeTrigger
            className={cls(`ds-resizebox-direct-${direction}`)}
            key={direction}
            direction={getDirection(direction)}
            onMouseDown={(e: React.MouseEvent) => {
              onTriggerMouseDown(direction, e);
            }}
          />
        );
      })}
    </div>
  );
}

export default forwardRef(ResizeBox);
