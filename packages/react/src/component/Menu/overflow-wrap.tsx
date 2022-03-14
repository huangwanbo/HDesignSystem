import React, {
  forwardRef,
  useRef,
  useState,
  ReactElement,
  useContext,
} from "react";
import ResizeObserver from "../../_util/resizeObserver";
import Trigger from "../Trigger";
import context from "./context";
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
  const triggerRef = useRef<Element>();
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number | null>(null);
  const { currentSelectedKey } = useContext(context);
  const getCurrentItemRight = () => {
    if (!wrapRef?.current) return;
    const maxWidth = getNodeWidth(wrapRef.current) - 100;
    let innerWidth = 0;
    let lastIndex = 0;

    const childrenList: HTMLElement[] = wrapRef?.current?.children
      ? [].slice.call(wrapRef?.current?.children)
      : [];
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
    if (!overflowChild || !overflowChild.length) return null;
    const hasCheck = overflowChild.filter(
      (child) => child.props._key == currentSelectedKey
    );
    const children = overflowChild.map((child) =>
      React.cloneElement(child, {
        ...child.props,
        overflow: true,
      })
    );
    return (
      <Trigger popupChildren={children} ref={triggerRef} key="overflow">
        <div className="ds-menu-item ds-menu-item-submenu">
          ...
          {hasCheck.length > 0 && (
            <div className={`ds-menu-item-selected-label`} />
          )}
        </div>
      </Trigger>
    );
  };
  const renderChild = () => {
    if (!props.children) return null;
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
    const childList = [
      ...(childrenList as Array<ReactElement>),
      overflowRender(overflowChild as ReactElement[]),
    ];
    return childList;
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
