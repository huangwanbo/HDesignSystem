import React, {
  forwardRef,
  ReactNode,
  CSSProperties,
  ReactElement,
} from "react";
import cls from "classNames";
import Trigger, { positionType } from "../Trigger";
const prefixCls = "ds-dropdown";

type DropdownType = {
  className: string | string[];
  style: CSSProperties;
  droplist: ReactNode;
  position: positionType;
  disabled: boolean;
  popupVisible: boolean;
  onVisibleChange: (visible: boolean) => void;
  children: ReactNode;
};

function ComponentRef(props: Partial<DropdownType>, ref: any) {
  const { className, style, droplist, position = "bottom", children } = props;
  const cs = cls(prefixCls, className);
  const childrenList = React.Children.map(droplist, (child) => {
    if (
      !React.isValidElement(child) ||
      typeof child === "string" ||
      typeof child === "number" ||
      typeof child === "boolean"
    )
      return child;
    const parentDom = child;
    const childDom = React.Children.map(
      child?.props.children,
      (childNextLevel) => {
        const newStyle: CSSProperties = {
          padding: "4px",
          overflow: "hidden",
          fontWeight: "unset",
          marginRight: "0px",
        };
        return React.cloneElement(childNextLevel as ReactElement, {
          ...childNextLevel?.props,
          style: {
            ...childNextLevel?.props?.style,
            ...newStyle,
          },
        });
      }
    );
    return React.cloneElement(parentDom, {
      children: childDom,
    });
  });

  return (
    <Trigger
      popupChildren={<div className={`${prefixCls}-menu`}>{childrenList}</div>}
      position={position}
      customStyle={{ width: "auto" }}
    >
      <div className={cs} style={style} ref={ref}>
        {children}
      </div>
    </Trigger>
  );
}

const Dropdown = forwardRef(ComponentRef);
Dropdown.displayName = "Dropdown";
export default Dropdown;
