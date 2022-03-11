import React, {
  forwardRef,
  CSSProperties,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import cls from "classNames";
import { throttle } from "lodash";
import { IconToTop } from "@DS/Icon";
import BTween from "../../_util/b-tween";
import { CSSTransition } from "react-transition-group";
const prefixCls = "ds-back-top";

type BackTopType = {
  style: CSSProperties;
  className: string | string[];
  visibleHeight: number;
  /**
   * need to set maxHeight if set custom
   *
   */
  target: () => HTMLElement | Window;
  onClick: () => void;
  easing: string;
  duration: number;
  children: ReactNode;
};

function ComponentRef(props: Partial<BackTopType>, ref: any) {
  const {
    style,
    className,
    visibleHeight,
    easing,
    duration,
    children,
    target,
    onClick,
  } = props;
  const [visible, setVisible] = useState(false);
  const scrollEvent = ref || useRef<any>();
  const getTarget = (target: HTMLElement | Window | undefined): HTMLElement => {
    return target === window
      ? document.documentElement
      : (target as HTMLElement);
  };
  useEffect(() => {
    const target = getTarget(props.target && props.target());
    const scrollHandler = throttle((e?: any) => {
      if (!scrollEvent.current) {
        scrollEvent.current = e && e?.target;
      }
      const scrollTop = (e && e?.target)?.scrollingElement?.scrollTop || target;
      setVisible(scrollTop >= (visibleHeight || 0));
    }, 100);
    //on(target, "scroll", scrollHandler);
    target.onscroll = scrollHandler;
    scrollEvent.current = null;
    scrollHandler();

    return () => {
      scrollHandler.cancel();
      target.onscroll = null;
    };
  }, [target, visibleHeight]);

  const scrollToTop = () => {
    if (!scrollEvent.current) {
      return;
    }
    const scrollTop = scrollEvent.current.scrollingElement.scrollTop;
    console.log(scrollTop);

    //@ts-ignore
    const tween = new BTween({
      from: { scrollTop },
      to: { scrollTop: 0 },
      duration: duration,
      easing: easing,
      onUpdate: (keys: any) => {
        console.log(keys.scrollTop);

        scrollEvent.current.scrollingElement.scrollTop = keys.scrollTop;
      },
    });
    tween.start();
    onClick && onClick();
  };
  return (
    <div
      ref={scrollEvent}
      className={cls(`${prefixCls}`, className)}
      style={style}
      onClick={scrollToTop}
    >
      <CSSTransition
        in={visible}
        timeout={100}
        classNames="fadeIn"
        unmountOnExit
      >
        {children || (
          <div className={`${prefixCls}-button`}>
            <IconToTop />
          </div>
        )}
      </CSSTransition>
    </div>
  );
}

const BackTop = forwardRef(ComponentRef);
BackTop.displayName = "BackTop";
BackTop.defaultProps = {
  visibleHeight: 400,
  easing: "quartOut",
  duration: 400,
  target: () => document.body,
};
export default BackTop;
