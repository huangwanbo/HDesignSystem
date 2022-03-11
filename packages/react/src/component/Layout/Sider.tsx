import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
import { IconLeft, IconRight } from "@DS/Icon";
import ResizeBox, { directionType } from "../ResizeBox";
type ComponentProps = {
  style: CSSProperties;
  className: string;
  collapsed: boolean;
  collapsible: boolean;
  defaultCollapsed: boolean;
  width: number;
  collapsedWidth: number | string;
  resizeDirections: Array<directionType>;
  onBreakpoint: (broken: boolean) => void;
  onCollapse: (collapsed: boolean) => void;
  hasResize: boolean;
} & HTMLAttributes<HTMLElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const {
    style,
    className,
    children,
    width = 200,
    collapsedWidth = 48,
    collapsible,
    onCollapse,
    resizeDirections = ["right"],
    hasResize = false,
  } = props;
  const [collapsed, setCollapsed] = useState(props.collapsed || false);
  const cs = cls(`${prefixCls}-sider`, className);
  const rawWidth = collapsed ? collapsedWidth : width;
  const siderWidth = Number.isInteger(rawWidth) ? `${rawWidth}px` : rawWidth;
  const renderTrigger = () => {
    const triggerIcon = collapsed ? <IconLeft /> : <IconRight />;
    return collapsible && !hasResize ? (
      <div
        style={{ width: siderWidth }}
        onClick={() => {
          setCollapsed(!collapsed);
          onCollapse && onCollapse(!collapsed);
        }}
      >
        {triggerIcon}
      </div>
    ) : null;
  };
  //   const onMoving = (e: any, evnet: Record<string, number>) => {
  //     console.log(e, evnet);
  //   };
  const collapsibleCss =
    collapsible && collapsed
      ? {
          width: siderWidth,
        }
      : {};
  const wrapperDom = (child: React.ReactElement) => {
    return hasResize ? (
      <ResizeBox
        ref={ref}
        style={{
          ...style,
          ...collapsibleCss,
        }}
        width={width}
        className={cs}
        directions={resizeDirections}
      >
        {child}
      </ResizeBox>
    ) : (
      <div
        ref={ref}
        style={{
          ...style,
          ...collapsibleCss,
        }}
        className={cs}
      >
        {child}
      </div>
    );
  };
  return wrapperDom(
    <>
      <div className={`${prefixCls}-sider-children`}>{children}</div>
      {renderTrigger()}
    </>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Sider";
export default Component;
