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
const prefixCls = "ds-menu";

type MenuType = {
  style?: CSSProperties;
  className?: string | string[];
  mode?: "horizontal" | "vertical";
  defaultSelectedKeys?: string;
  children: ReactNode;
};

function ComponentRef(props: MenuType, ref: any) {
  const {
    style,
    className,
    mode = "horizontal",
    children,
    defaultSelectedKeys,
  } = props;
  const ItemMap = useRef(new Map<string, ReactInstance>());
  const [currentSelected, setCurrentSelected] = useState(
    defaultSelectedKeys || ""
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
    key: string
  ) => {
    console.log(e, key);
    setCurrentSelected(key);
    // todo
  };
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${mode}`]: true,
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
  return (
    <div className={cs} style={style} ref={ref}>
      <Context.Provider
        value={{
          currentSelectedKey: currentSelected,
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
const Menu = Component as typeof Component & { MenuItem: typeof MenuItem };
Menu.displayName = "Menu";
Menu.MenuItem = MenuItem;
export default Menu;
