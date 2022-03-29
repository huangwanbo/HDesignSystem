import React, { forwardRef, CSSProperties, ReactNode } from "react";
import cls from "classNames";
const prefixCls = "ds-progress";
const shapeType = Object.freeze({ line: "line", circle: "circle" });
const sizeType = Object.freeze({
  small: "small",
  default: "default",
  mini: "mini",
  large: "large",
});
const sizeToPx = Object.freeze({
  small: "3px",
  default: "4px",
  large: "8px",
});
const statusType = Object.freeze({
  warning: "warning",
  success: "success",
  error: "error",
});
type ProgressType = {
  style: CSSProperties;
  className: string | string[];
  type: keyof typeof shapeType;
  /* 进度条颜色 */
  color: string;
  /* 剩余进度color*/
  trailColor: string;
  /* 显示文本 */
  showText: boolean;
  formatText: (percents: number) => ReactNode;
  percents: number;
  /* 进度条宽度 */
  strokeWidth: number;
  width: number | string;
  percent: number;
  size: keyof typeof sizeType;
  status: keyof typeof statusType;
};
// todo: circle will should do.
function ComponentRef(props: Partial<ProgressType>, ref: any) {
  const {
    className,
    style,
    type = shapeType.line,
    size = sizeType.default,
    showText = true,
    percent = 0,
    width,
    color,
    status,
    formatText,
  } = props;
  const lineInnerStyle: CSSProperties = {
    width: percent + "px",
  };
  const formatTextFn = () => {
    if (formatText) {
      return formatText(percent);
    }
    return percent + "%";
  };
  if (status) {
    switch (status) {
      case statusType.error:
        lineInnerStyle.backgroundColor = "var(--ds-danger-6)";
        break;
      case statusType.warning:
        lineInnerStyle.backgroundColor = "var(--ds-warning-6)";
        break;
      case statusType.success:
      default:
        lineInnerStyle.backgroundColor = "var(--ds-primary-6)";
    }
  }
  if (color) {
    lineInnerStyle.backgroundColor = color;
  }
  const lineEle = (
    <div className={cls(`${prefixCls}-line-wrapper`)}>
      <div
        className={cls(`${prefixCls}-line-outer`)}
        style={{ height: sizeToPx[size as keyof typeof sizeToPx] }}
      >
        <div
          className={cls(`${prefixCls}-line-inner`)}
          style={lineInnerStyle}
        />
      </div>
      {showText && (
        <div className={cls(`${prefixCls}-line-text`)}>{formatTextFn()}</div>
      )}
    </div>
  );
  const circleEle = <div></div>;
  const cs = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-${size}`]: true,
    },
    className
  );
  const progressStyle: CSSProperties = { ...style };
  if (width) {
    if (typeof width !== "number") {
      progressStyle.width = width;
    } else {
      progressStyle.width = width + "px";
    }
  }
  return (
    <div className={cs} style={progressStyle} ref={ref}>
      {type === shapeType.line ? lineEle : circleEle}
    </div>
  );
}

const Progress = forwardRef(ComponentRef);
Progress.displayName = "Progress";
export default Progress;
