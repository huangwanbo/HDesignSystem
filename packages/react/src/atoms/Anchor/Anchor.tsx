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
const prefixCls = "ds-anchor";

type AnchorType = {
  //affix: boolean;
  className: string | string[];
  style: CSSProperties;
  bounds: number;
  getContainer: () => HTMLElement;
  getCurrentAnchor: () => string;
  offset: number;
  showInkInFixed: boolean;
  targetOffset: number;
  onChange: (currentActiveLink: string) => void;
  onClick: (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link?: ReactInstance
  ) => void;
  children: ReactNode;
};

function ComponentRef(props: Partial<AnchorType>, ref: any) {
  const { onClick, onChange } = props;
  const anchorLinkMap = useRef(new Map<string, ReactInstance>());
  const anchorLinkSet = useRef(new Set<string>());
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

  function getOffsetTop(dom: ReactInstance) {
    const node = findDOMNode(dom) as Element;
    const { top } = node.getBoundingClientRect();
    setCurrentOffsetTop(top);
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
  }, []);
  useEffect(() => {
    handleChange();
  }, [currentLink]);
  return (
    <div ref={ref} className={cls(prefixCls)}>
      {anchorLinkSet.current.has(currentLink) && (
        <div
          className={cls(`${prefixCls}-line-slider`)}
          style={{ top: `${currentOffsetTop}px` }}
        />
      )}
      <AnchorContext.Provider
        value={{
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
