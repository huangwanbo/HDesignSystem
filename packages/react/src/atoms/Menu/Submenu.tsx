import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useState,
  useContext,
} from "react";
import cls from "classNames";
import { IconDown, IconUp, IconRight } from "@DS/Icon";
import context from "./context";
import { findInTowArray } from "./util";
import Trigger from "../Trigger";
import { modeType } from "./constant";
const prefixCls = "ds-menu";

type SubmenuType = {
  style: CSSProperties;
  className: string | string[];
  title: ReactNode;
  key: string;
  selectable: boolean;
  children: ReactNode;
  level: number;
};

function ComponentRef(props: SubmenuType, ref: any) {
  const { title, children, className, style } = props;
  const keys =
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;
      return child.key;
    }) || [];
  const childrenList = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child, {
      ...child.props,
      _key: child.key || `menu${index}`,
      level: props.level + 1,
    });
  });
  const { currentSelectedKey, collapsed, mode } = useContext(context);
  console.log(keys, currentSelectedKey);
  const [isOpen, setIsOpen] = useState(
    findInTowArray(keys, currentSelectedKey)
  );
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const headCls = cls(
    `${prefixCls}-inline-header`,
    {
      [`${prefixCls}-item-selected`]: findInTowArray(keys, currentSelectedKey),
      [`${prefixCls}-collapsed`]: collapsed,
    },
    className
  );
  const Dom =
    mode === modeType.pop ? (
      <Trigger popupChildren={childrenList} position="right">
        <div className={cls(`${prefixCls}-inline`)} ref={ref}>
          <div className={headCls} style={style} onClick={handleClick}>
            {title}
            <span
              className={cls(`${prefixCls}-item-suffix`)}
              style={{ visibility: collapsed ? "hidden" : "unset" }}
            >
              <IconRight />
            </span>
          </div>
        </div>
      </Trigger>
    ) : (
      <div className={cls(`${prefixCls}-inline`)} ref={ref}>
        <div className={headCls} style={style} onClick={handleClick}>
          {title}
          <span
            className={cls(`${prefixCls}-item-suffix`)}
            style={{ visibility: collapsed ? "hidden" : "unset" }}
          >
            {isOpen ? <IconDown /> : <IconUp />}
          </span>
        </div>
        <div
          className={cls(`${prefixCls}-inline-content`)}
          style={{ height: isOpen && !collapsed ? "auto" : "0px" }}
        >
          {childrenList}
        </div>
      </div>
    );
  return Dom;
}

const SubMenu = forwardRef(ComponentRef);
SubMenu.displayName = "SubMenu";
export default SubMenu;
