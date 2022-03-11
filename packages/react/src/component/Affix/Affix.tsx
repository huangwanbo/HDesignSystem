import React, {
  forwardRef,
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { findDOMNode } from "react-dom";
import cls from "classNames";
import { on, off } from "../../_util/event";
import { throttle } from "lodash";
const prefixCls = "ds-affix";
type stateType = {
  fixedStyle: CSSProperties;
};
type AffixType = {
  className: string | string[];
  style: CSSProperties;
  offsetTop: number;
  offsetBottom: number;
  target: () => HTMLElement;
  targetContainer: () => HTMLElement | Window;
  onChange: (affixed: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

function ComponentRef(props: Partial<AffixType>, ref: any) {
  const {
    className,
    style,
    offsetTop,
    offsetBottom,
    children,
    target,
    targetContainer,
    onChange,
    ...rest
  } = props;
  console.log(targetContainer);

  const affixCls = cls(prefixCls, className);
  const affixRef = ref || useRef(null);
  const [state, setState] = useState<stateType>({
    fixedStyle: {},
  });
  const { fixedStyle } = state;
  const mergeStyle: CSSProperties = {
    ...fixedStyle,
  };
  const getTarget = () => {
    return target ? target() : document.body;
  };
  useEffect(() => {
    const target = getTarget();
    let hasfixed = false;
    const handlerFn = throttle(() => {
      const Dom = findDOMNode(affixRef.current) as Element;
      const { top, bottom } = Dom.getBoundingClientRect();
      console.log(window.innerHeight, target.scrollTop, bottom, offsetBottom);

      if (
        offsetTop !== undefined &&
        target.scrollTop > top &&
        top <= (offsetTop || 0)
      ) {
        if (hasfixed) return;
        setState({
          fixedStyle: {
            position: "fixed",
            top: `${offsetTop || 0}px`,
            width: affixRef.current.offsetWidth,
            height: affixRef.current.offsetHeight,
          },
        });
        onChange && onChange(true);
        hasfixed = true;
      } else if (
        offsetBottom !== undefined &&
        target.scrollTop < bottom
        //top <= (offsetTop || 0)
      ) {
        if (hasfixed) return;
        setState({
          fixedStyle: {
            position: "fixed",
            bottom: `${offsetBottom || 0}px`,
            width: affixRef.current.offsetWidth,
            height: affixRef.current.offsetHeight,
          },
        });
        hasfixed = true;
        onChange && onChange(true);
      } else {
        if (!hasfixed) return;
        setState({ fixedStyle: {} });
        hasfixed = false;
        onChange && onChange(false);
      }
    }, 100);
    on(target, "scroll", handlerFn);
    // target.onscroll = handlerFn;

    return () => {
      off(target, "scroll", handlerFn);
    };
  }, [target]);
  return (
    <div className={affixCls} ref={affixRef} {...rest} style={style}>
      <div style={mergeStyle}>{children}</div>
    </div>
  );
}

const Affix = forwardRef(ComponentRef);
Affix.displayName = "Affix";
Affix.defaultProps = {
  target: () => document.body,
  targetContainer: () => window,
};
export default Affix;
