import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cls from "classNames";
import { prefixCls } from "./constant";
import Header from "./Header";
import Footer from "./Footer";
import Sider from "./Sider";
import Content from "./Content";
type ComponentProps = {
  style: CSSProperties;
  className: string;
  hasSider: boolean;
} & HTMLAttributes<HTMLElement>;
function componentRef(props: Partial<ComponentProps>, ref: any) {
  const { style, className, children, hasSider } = props;
  console.log(children);

  const findSider =
    children &&
    (Array.isArray(children) ? children : [children]).filter(
      (child) => child.type.displayName == "Sider"
    );
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]:
        hasSider || (findSider && findSider?.length > 0),
    },
    className
  );
  return (
    <section ref={ref} style={style} className={cs}>
      {children}
    </section>
  );
}

const Component = forwardRef(componentRef);
const Layout = Component as typeof Component & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Sider: typeof Sider;
};
Layout.displayName = "Layout";
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Header = Header;
Layout.Sider = Sider;

export default Layout;
