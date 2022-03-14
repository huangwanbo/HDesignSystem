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
import { modeType } from "./constant";
const prefixCls = "ds-menu-item";

type MenuItemType = {
  style?: CSSProperties;
  className?: string | string[];
  key?: string | number;
  _key?: string | number;
  disabled?: boolean;
  children: ReactNode;
  /**
   * 判断是否在overflow里面
   */
  overflow?: boolean;
  /**
   * 层级标记
   */
  level: number;
};

function ComponentRef(props: MenuItemType, ref: any) {
  const { style, className, children, disabled, _key = "defaultKey" } = props;
  const currentRef = ref || useRef();
  const Context = useContext(context);
  const { mode, currentSelectedKey, addItem, deleteItem, handleItemClick } =
    Context;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-selected`]: currentSelectedKey.includes(_key),
      [`${prefixCls}-indented`]: mode === modeType.vertical,

      [`ds-menu-inline-header`]: props?.level == 0,
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
    if (currentSelectedKey.includes(_key)) return;
    handleItemClick(e, [_key]);
  };
  useEffect(() => {
    registerItem();
    return () => {
      unRegisterItem();
    };
  }, [_key]);
  const renderLabel = currentSelectedKey.includes(_key) && !props.overflow && (
    <div className={`${prefixCls}-selected-label`} />
  );
  const renderChild = (
    <>
      {(mode === modeType.vertical || mode === modeType.pop) && (
        <>
          {props?.level > 0 && mode !== modeType.pop && (
            <span className={cls(`${prefixCls}-indent`)}></span>
          )}
          <span
            className={cls(`${prefixCls}-inner`)}
            style={{ display: "inline-block" }}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child;
              return React.cloneElement(child, {
                ...child.props,
                _key: child.key || `menu${index}`,
                level: props.level + 1,
              });
            })}
          </span>
        </>
      )}
      {mode === modeType.horizontal && children}
      {mode === modeType.horizontal && renderLabel}
    </>
  );
  return (
    <div className={cs} style={style} ref={currentRef} onClick={onHandleClick}>
      {renderChild}
    </div>
  );
}

const MenuItem = forwardRef(ComponentRef);
MenuItem.displayName = "MenuItem";
export default MenuItem;
