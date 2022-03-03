import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import cls from "classNames";
import AnchorContext from "./context";
const prefixCls = "ds-anchor-link";

type LinkType = {
  title: ReactNode;
  href: string;
  target?: string;
  children?: ReactNode | ReactNode[];
};

function ComponentRef(props: LinkType, ref: any) {
  const { title, href, target, children } = props;
  const context = useContext(AnchorContext);
  const { currentLink, addLink, removeLink, handleClick, lineless } = context;
  const LinkRef = ref || useRef(null);
  const linkCls = cls(prefixCls, {
    [`${prefixCls}-active`]: currentLink === href,
  });
  const titleCls = cls(`${prefixCls}-title`, {
    [`${prefixCls}-title-active`]: currentLink === href,
    [`${prefixCls}-lineless`]: currentLink === href && lineless,
    [`${prefixCls}-title-lineless`]: currentLink === href && lineless,
  });
  function registerLink() {
    addLink && addLink(href, LinkRef.current);
  }
  function unRegisterLink() {
    removeLink && removeLink(href);
  }
  function handleClickLink(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    //context.changeLink(href);
    handleClick && handleClick(e, href);
    context.currentLink = href;
  }
  useEffect(() => {
    registerLink();
    return () => {
      unRegisterLink();
    };
  }, [href]);
  return (
    <div className={linkCls} ref={LinkRef}>
      <a
        className={titleCls}
        href={href}
        target={target}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          handleClickLink(e);
        }}
      >
        {title}
      </a>
      {children && children}
    </div>
  );
}

const Link = forwardRef(ComponentRef);
Link.displayName = "Link";
export default Link;
