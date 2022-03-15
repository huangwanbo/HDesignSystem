import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useCallback,
} from "react";
import cls from "classNames";
import Item from "./Item";
import { IconObliqueLine } from "@DS/Icon";
const prefixCls = "ds-breadcrumb";
type RouterType = {
  path: string;
  breadcrumbName: string;
  children?: RouterType[];
};
export type BreadcrumbType = {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode[] | ReactNode;
  routes?: RouterType[];
  separator?: ReactNode;
  itemRender?: (routes: RouterType) => ReactNode;
} & HTMLElement;
// todo: droplist 下拉菜单
function ComponentRef(props: Partial<BreadcrumbType>, ref: any) {
  const { style, className, children, separator, routes, itemRender } = props;
  const separatorDom = (
    <span className={cls(`${prefixCls}-item-separator`)}>
      {separator || <IconObliqueLine />}
    </span>
  );
  const renderDefaultContent = useCallback(() => {
    if (!Array.isArray(children)) {
      return children;
    }
    return children.map((child, i) => {
      if (i !== children.length - 1) {
        return (
          <React.Fragment key={i}>
            {child}
            {separatorDom}
          </React.Fragment>
        );
      }
      return child;
    });
  }, [children, separator]);
  const renderRoutes = useCallback(() => {
    if (!routes) return;
    if (routes && itemRender) {
      {
        routes.map((pathProps) => {
          return itemRender(pathProps);
        });
      }
    }
    return (
      <>
        {routes.map((pathProps, i) => {
          return (
            <Item key={pathProps.path}>
              <a href={pathProps.path}>{pathProps.breadcrumbName}</a>
              {i != routes.length - 1 && separatorDom}
            </Item>
          );
        })}
      </>
    );
  }, [routes, itemRender]);
  return (
    <div ref={ref} style={style} className={cls(prefixCls, className)}>
      {routes ? renderRoutes() : renderDefaultContent()}
    </div>
  );
}

const Component = forwardRef(ComponentRef);
const Breadcrumb = Component as typeof Component & {
  BreadcrumbItem: typeof Item;
};
Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.BreadcrumbItem = Item;
export default Breadcrumb;
