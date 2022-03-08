import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from "react";
import cls from "classNames";
import context from "./context";
const prefixCls = "ds-menu-item";

type MenuItemType = {
  style?: CSSProperties;
  className?: string | string[];
  key?: string;
  _key?: string;
  disabled?: boolean;
  children: ReactNode;
  /**
   * 判断是否在overflow里面
   */
  overflow?: boolean;
};

function ComponentRef(props: MenuItemType, ref: any) {
  const { style, className, children, disabled, _key = "defaultKey" } = props;
  const currentRef = ref || useRef();
  const Context = useContext(context);
  const { currentSelectedKey, addItem, deleteItem, handleItemClick } = Context;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-selected`]: currentSelectedKey === _key,
    },
    className
  );
  const registerItem = () => {
    addItem && addItem(_key, currentRef.current);
  };
  const unRegisterItem = () => {
    deleteItem && deleteItem(_key);
  };
  const onHandleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    handleItemClick(e, _key);
  };
  useEffect(() => {
    registerItem();
    return () => {
      unRegisterItem();
    };
  }, [_key]);
  const renderLabel = currentSelectedKey === _key && !props.overflow && (
    <div className={`${prefixCls}-selected-label`} />
  );
  return (
    <div className={cs} style={style} ref={currentRef} onClick={onHandleClick}>
      {children}
      {renderLabel}
    </div>
  );
}

const MenuItem = forwardRef(ComponentRef);
MenuItem.displayName = "MenuItem";
export default MenuItem;
