import React, {
  forwardRef,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  CSSProperties,
  useState,
  ReactInstance,
} from "react";
import { findDOMNode } from "react-dom";
import AnchorContext from "./context";
import Link from "./Link";
import cls from "classNames";
import { useStatePromise } from "../../_util/hook";
import { off, on } from "../../_util/event";
import { throttle } from "lodash";
const prefixCls = "ds-anchor";

type AnchorType = {
  //affix: boolean;
  className: string | string[];
  style: CSSProperties;
  bounds: number;
  /**
   * need to set maxHeight if set custom
   *
   */
  getContainer: () => HTMLElement;
  getCurrentAnchor: () => string;
  offset: number;
  targetOffset: number;
  onChange: (currentActiveLink: string) => void;
  onClick: (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link?: ReactInstance
  ) => void;
  children: ReactNode;
  lineless: boolean;
};

function ComponentRef(props: Partial<AnchorType>, ref: any) {
  const { onClick, onChange, className, style, lineless } = props;
  const anchorLinkMap = useRef(new Map<string, ReactInstance>());
  const anchorLinkSet = useRef(new Set<string>());
  const containerRef = ref || useRef<Element>(null);
  //   const currentLinkRef = useRef<ReactNode | null>(null);
  const context = useContext(AnchorContext);
  const [currentLink, setCurrentLink] = useStatePromise("#");
  const [currentOffsetTop, setCurrentOffsetTop] = useState<number>(0);
  function addLink(name: string, link: ReactInstance) {
    if (!anchorLinkSet.current.has(name)) {
      anchorLinkSet.current.add(name);
      anchorLinkMap.current.set(name, link);
    }
  }
  function removeLink(name: string) {
    if (anchorLinkSet.current.has(name)) {
      anchorLinkSet.current.delete(name);
      anchorLinkMap.current.delete(name);
    }
  }
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    linkName: string
  ) {
    const link = anchorLinkMap.current.get(linkName) as ReactInstance;
    onClick && onClick(e, link);
    if (linkName == context.currentLink) return;
    setCurrentLink(linkName);
    getOffsetTop(link);
  }

  function currentLinkInView(offsetTop: number) {
    containerRef.current.scrollTop = offsetTop;
  }

  function getOffsetTop(dom: ReactInstance) {
    const node = findDOMNode(dom) as Element & { offsetTop: number };
    const { top } = node.getBoundingClientRect();
    setCurrentOffsetTop(node.offsetTop);
    currentLinkInView(
      node.offsetTop == 0
        ? 0
        : node.offsetTop == top
        ? node.offsetTop
        : node.offsetTop - top
    );
  }

  function setOffset(value: string) {
    const link = anchorLinkMap.current.get(value);
    if (link) {
      getOffsetTop(link);
    }
  }
  function handleChange() {
    onChange && onChange(currentLink);
  }
  useEffect(() => {
    const hash = decodeURIComponent(location.hash);
    if (hash) {
      setCurrentLink(hash).then((value) => {
        setOffset(value);
      });
    }
    const handleScroll = throttle(
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        console.log(e);
      },
      100
    );
    on(containerRef.current, "scroll", handleScroll);
    return () => {
      off(containerRef.current, "scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    handleChange();
  }, [currentLink]);
  return (
    <div ref={containerRef} className={cls(prefixCls, className)} style={style}>
      {anchorLinkSet.current.has(currentLink) && !lineless && (
        <div
          className={cls(`${prefixCls}-line-slider`)}
          style={{ top: `${currentOffsetTop}px` }}
        />
      )}
      <AnchorContext.Provider
        value={{
          lineless,
          currentLink,
          addLink,
          removeLink,
          handleClick,
        }}
      >
        <div className={cls(`${prefixCls}-list`)}>{props.children}</div>
      </AnchorContext.Provider>
    </div>
  );
}

const Component = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<AnchorType>
>(ComponentRef);
const Anchor = Component as typeof Component & {
  Link: typeof Link;
};
Anchor.displayName = "Anchor";
Anchor.Link = Link;
export default Anchor;
