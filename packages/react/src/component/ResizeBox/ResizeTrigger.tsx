import React, { CSSProperties } from "react";
import cls from "classNames";
import { IconDragDot, IconDragDotVertical } from "@DS/Icon";
import ResizeObserver from "../../_util/resizeObserver";
const perfixCls = "ds-resizebox-trigger";
export type ResizeTriggerProps = {
  className?: string | string[];
  style?: CSSProperties;
  direction: "horizontal" | "vertical";
  onResize?: (e: any) => void;
  onMouseDown?: (e: any) => void;
};

function ResizeTrigger(props: ResizeTriggerProps) {
  const {
    className,
    style,
    direction = "horizontal",
    onResize,
    onMouseDown,
  } = props;
  const renderIcon =
    direction == "horizontal" ? <IconDragDot /> : <IconDragDotVertical />;
  return (
    <ResizeObserver onResize={onResize}>
      <div
        onMouseDown={onMouseDown}
        className={cls(
          perfixCls,
          {
            [`${perfixCls}-wrapper`]: true,
            [`${perfixCls}-wrapper-${direction}`]: true,
          },
          className
        )}
        style={style}
      >
        {renderIcon}
      </div>
    </ResizeObserver>
  );
}

export default ResizeTrigger;
