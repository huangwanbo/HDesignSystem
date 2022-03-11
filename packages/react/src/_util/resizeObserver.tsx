import React, {
  ReactNode,
  useEffect,
  useRef,
  ReactElement,
  forwardRef,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { findDOMNode } from "react-dom";

type ResizeProps = {
  onResize?: (entry: ResizeObserverEntry[]) => void;
  children: ReactNode;
};
const ResizeObserverComponent = (props: ResizeProps, ref: any) => {
  const { children } = props;
  const childRef = ref || useRef(null);
  let resizeObserver: any;
  useEffect(() => {
    resizeObserver = new ResizeObserver((entry) => {
      const { onResize } = props;
      onResize && onResize(entry);
    });
    resizeObserver.observe(findDOMNode(childRef.current) as Element);
    return () => {
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, []);
  const Dom = React.cloneElement(children as ReactElement, {
    ref: childRef,
  });
  return Dom;
};

export default forwardRef(ResizeObserverComponent);
