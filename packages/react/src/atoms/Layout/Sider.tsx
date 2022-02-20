import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
import { IconLeft, IconRight } from "@DS/Icon";
type ComponentProps = {
  style: CSSProperties;
  className: string;
  collapsed: boolean;
  collapsible: boolean;
  defaultCollapsed: boolean;
  width: number | string;
  collapsedWidth: number | string;
  onBreakpoint: (broken: boolean) => void;
  onCollapse: (collapsed: boolean) => void;
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
  } = props;
  const [collapsed, setCollapsed] = useState(props.collapsed || false);
  const cs = cls(`${prefixCls}-sider`, className);
  const rawWidth = collapsed ? collapsedWidth : width;
  const siderWidth = Number.isInteger(rawWidth) ? `${rawWidth}px` : rawWidth;
  const renderTrigger = () => {
    const triggerIcon = collapsed ? <IconLeft /> : <IconRight />;
    return collapsible ? (
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
  return (
    <aside
      ref={ref}
      style={{
        width: siderWidth,
        ...style,
      }}
      className={cs}
    >
      <div>{children}</div>
      {renderTrigger()}
    </aside>
  );
}

const Component = forwardRef(componentRef);
Component.displayName = "Sider";
export default Component;
