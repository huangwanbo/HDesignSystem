import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useRef,
  ReactInstance,
  useState,
} from "react";
import MenuItem from "./MenuItem";
import Context from "./context";
import cls from "classNames";
import OverFlowWrap from "./overflow-wrap";
import SubMenu from "./Submenu";
import { themeType, modeType } from "./constant";
import { IconMenuUnfold, IconMenuFold } from "@DS/Icon";
const prefixCls = "ds-menu";

type MenuType = {
  style?: CSSProperties;
  className?: string | string[];
  mode?: keyof typeof modeType;
  defaultSelectedKeys?: string[];
  children: ReactNode;
  theme?: keyof typeof themeType;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  hasCollapseButton?: boolean;
  onClickItem?: (
    key: (string | number)[],
    item: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

function ComponentRef(props: MenuType, ref: any) {
  const {
    style,
    className,
    mode = modeType.horizontal,
    children,
    defaultSelectedKeys,
    theme = themeType.light,
    collapsed: propsCollapsed = false,
    onCollapseChange,
    hasCollapseButton = true,
    onClickItem,
  } = props;
  const ItemMap = useRef(new Map<string | number, ReactInstance>());
  const [currentSelected, setCurrentSelected] = useState<(string | number)[]>(
    defaultSelectedKeys || []
  );
  const [collapsed, setCollapsed] = useState(propsCollapsed);
  const addItem = (key: string | number, Item: ReactInstance) => {
    if (!ItemMap.current.has(key)) {
      ItemMap.current.set(key, Item);
    }
  };
  const deleteItem = (key: string | number) => {
    if (!ItemMap.current.has(key)) {
      ItemMap.current.delete(key);
    }
  };
  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: (string | number)[]
  ) => {
    onClickItem && onClickItem(key, e);
    setCurrentSelected(key);
    // todo
  };
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-vertical`]:
        mode == modeType.vertical || mode == modeType.pop,
      [`${prefixCls}-horizontal`]: mode == modeType.horizontal,
      [`${prefixCls}-light`]: theme === themeType.light,
      [`${prefixCls}-dark`]: theme === themeType.dark,
    },
    className
  );
  const renderChildren = (children: ReactNode) => {
    const childrenList = React.Children.map(children, (item, index) => {
      if (!React.isValidElement(item) || typeof item.type === "string") {
        throw TypeError("error: you must be use MenuItem or SubMenu !");
      }
      return React.cloneElement(item, {
        ...item.props,
        _key: item.key || `menu-${index}`,
        level: 0,
      });
    });
    const Icon = collapsed ? <IconMenuFold /> : <IconMenuUnfold />;
    const mergedHasCollapseButton =
      mode != modeType.horizontal && hasCollapseButton;
    const CollapseButton = (
      <div
        className={cls(`${prefixCls}-collapse-button`)}
        key={"collapse-button"}
        onClick={() => {
          const newCollapse = !collapsed;
          setCollapsed(newCollapse);
          onCollapseChange && onCollapseChange(newCollapse);
        }}
      >
        {Icon}
      </div>
    );
    return [childrenList, mergedHasCollapseButton && CollapseButton];
  };
  return (
    <div
      className={cs}
      style={{ ...style, width: collapsed ? "48px" : "200px" }}
      ref={ref}
    >
      <Context.Provider
        value={{
          mode,
          currentSelectedKey: currentSelected,
          collapsed,
          addItem,
          deleteItem,
          handleItemClick,
        }}
      >
        <OverFlowWrap>{renderChildren(children)}</OverFlowWrap>
      </Context.Provider>
    </div>
  );
}

const Component = forwardRef(ComponentRef);
const Menu = Component as typeof Component & {
  MenuItem: typeof MenuItem;
  SubMenu: typeof SubMenu;
};
Menu.displayName = "Menu";
Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;
export default Menu;
