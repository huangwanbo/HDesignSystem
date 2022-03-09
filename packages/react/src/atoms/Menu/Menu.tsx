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
import { themeType } from "./constant";
const prefixCls = "ds-menu";

type MenuType = {
  style?: CSSProperties;
  className?: string | string[];
  mode?: "horizontal" | "vertical";
  defaultSelectedKeys?: string[];
  children: ReactNode;
  theme?: keyof typeof themeType;
  collapsed?: boolean;
};

function ComponentRef(props: MenuType, ref: any) {
  const {
    style,
    className,
    mode = "horizontal",
    children,
    defaultSelectedKeys,
    theme = themeType.light,
    collapsed = false,
  } = props;
  const ItemMap = useRef(new Map<string, ReactInstance>());
  const [currentSelected, setCurrentSelected] = useState(
    defaultSelectedKeys || []
  );
  const addItem = (key: string, Item: ReactInstance) => {
    if (!ItemMap.current.has(key)) {
      ItemMap.current.set(key, Item);
    }
  };
  const deleteItem = (key: string) => {
    if (!ItemMap.current.has(key)) {
      ItemMap.current.delete(key);
    }
  };
  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string[]
  ) => {
    console.log(e, key);
    setCurrentSelected(key);
    // todo
  };
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${mode}`]: true,
      [`${prefixCls}-light`]: theme === themeType.light,
      [`${prefixCls}-dark`]: theme === themeType.dark,
    },
    className
  );
  const renderChildren = (children: ReactNode) => {
    return React.Children.map(children, (item, index) => {
      if (!React.isValidElement(item) || typeof item.type === "string") {
        throw TypeError("error: you must be use MenuItem !");
      }
      return React.cloneElement(item, {
        ...item.props,
        _key: item.key || `menu-${index}`,
      });
    });
  };
  console.log(collapsed);

  return (
    <div
      className={cs}
      style={{ ...style, width: collapsed ? "54px" : "200px" }}
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
