import React, { forwardRef, useRef, useState, ReactElement } from "react";
//import { findDOMNode } from "react-dom";
import ResizeObserver from "../../_util/resizeObserver";
import { IconArrowDown } from "@DS/Icon";

import cls from "classNames";
const prefixCls = "ds-overflow-wrap";
const overflowCls = prefixCls + "-hidden";
type OverFlowWrapType = {
  children: React.ReactNode;
};
function getNodeWidth(node: HTMLElement): number {
  return Number(node && node.getBoundingClientRect().width.toFixed(2)) || 0;
}
function getMargin(
  node: HTMLElement,
  direction: "marginLeft" | "marginRight"
): number {
  return Number(node && node.style[direction]?.replace("px", ""));
}
function ComponentRef(props: OverFlowWrapType, ref: any) {
  const wrapRef = ref || useRef();
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number | null>(null);
  const getCurrentItemRight = () => {
    const maxWidth = getNodeWidth(wrapRef.current) - 100;
    let innerWidth = 0;
    let lastIndex = 0;
    // const childrenList: HTMLElement[] = [...childrenHTMLCollection.current];
    const childrenList: HTMLElement[] = [].slice.call(wrapRef.current.children);
    const len = childrenList.length;

    for (let i = 0; i < len; i++) {
      innerWidth +=
        getNodeWidth(childrenList[i]) +
        getMargin(childrenList[i], "marginLeft") +
        getMargin(childrenList[i], "marginRight");
      if (innerWidth > maxWidth) {
        break;
      }
      lastIndex++;
    }
    setLastVisibleIndex(lastIndex);
  };
  const overflowRender = (overflowChild: ReactElement[] | null) => {
    //todo : trigger popup
    if (!overflowChild) return null;
    return (
      <div className="ds-menu-item ds-menu-item-submenu">
        <span>...</span>
        <IconArrowDown />
        <div className="ds-menu-item-submenu-block">{overflowChild}</div>
      </div>
    );
  };
  const renderChild = () => {
    const childrenList = React.Children.map(props.children, (child, index) => {
      if (!lastVisibleIndex) return child;
      if (index <= lastVisibleIndex - 1) {
        return React.cloneElement(child as ReactElement);
      }
      return React.cloneElement(child as ReactElement, {
        className: cls(
          (child as ReactElement).props.className,
          ` ${overflowCls}`
        ),
      });
    });
    const overflowChild =
      Array.isArray(props.children) &&
      lastVisibleIndex &&
      props.children.slice(lastVisibleIndex);
    return [
      ...(childrenList as Array<ReactElement>),
      overflowRender(overflowChild as ReactElement[]),
    ];
  };
  const onResize = () => {
    getCurrentItemRight();
  };
  return (
    <ResizeObserver ref={wrapRef} onResize={onResize}>
      <div ref={wrapRef} className={cls(prefixCls)}>
        {renderChild()}
      </div>
    </ResizeObserver>
  );
}

const OverFlowWrap = forwardRef(ComponentRef);
OverFlowWrap.displayName = "OverFlowWrap";
export default OverFlowWrap;
