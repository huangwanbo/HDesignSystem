import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  HTMLAttributes,
  useRef,
  useState,
  ForwardRefExoticComponent,
  PropsWithChildren,
} from "react";
import Button, { ButtonProps } from "../Button";
import { PortalWrapper } from "../Portal";
import { IconClose } from "@DS/Icon";
import cls from "classNames";
import { CSSTransition } from "react-transition-group";
import confirm, { ConfirmProps, destoryList } from "./Comfirm";
import useModal from "./useModal";
const prefixCls = "ds-modal";

type CursorPositionType = { left: number; top: number } | null;
let cursorPosition: CursorPositionType | null = null;
document.documentElement.addEventListener(
  "click",
  (e: MouseEvent) => {
    cursorPosition = {
      left: e.clientX,
      top: e.clientY,
    };
    setTimeout(() => {
      cursorPosition = null;
    }, 100);
  },
  true
);
export type ModalType = {
  style: CSSProperties;
  className: string | string[];
  onCancel: () => void;
  onOk: (e?: MouseEvent) => Promise<any> | void;
  getPopupContainer: () => HTMLElement;
  title: ReactNode;
  visible: boolean;
  mask: boolean;
  simple: boolean;
  okText: string;
  cancelText: string;
  hideCancel: boolean;
  okButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;
  /* if null nothing*/
  footer: ReactNode;
  closable: boolean;
  closeIcon: ReactNode;
  maskClosable: boolean;
  maskStyle: CSSProperties;
  afterOpen: () => void;
  afterClose: () => void;
  confirmLoading: boolean;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  escToExit: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement> & {
    confirm: (config: ConfirmProps) => void;
  };

function ComponentRef(props: Partial<ModalType>, ref: any) {
  const {
    className,
    style,
    title,
    footer,
    onCancel,
    cancelButtonProps,
    okButtonProps,
    cancelText,
    okText,
    children,
    closable = true,
    closeIcon,
    mask = true,
    visible,
    onOk,
    afterOpen,
    afterClose,
    maskClosable = true,
    simple,
    hideCancel,
    mountOnEnter = true,
    unmountOnExit = true,
    ...rest
  } = props;
  const wrapperRef = ref || useRef();
  const cursorPositionRef = useRef<CursorPositionType>(null);
  const haveOriginTransformOrigin = useRef<boolean>(false);
  //const [wrapperVisible, setWrapperVisible] = useState(visible);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const setTransformOrigin = (e: HTMLDivElement) => {
    if (haveOriginTransformOrigin.current) return;

    let transformOrigin = "";
    if (cursorPositionRef.current) {
      const eRect = e.getBoundingClientRect();
      const { left, top } = cursorPositionRef.current;
      transformOrigin = `${left - eRect.left}px ${top - eRect.top}px`;
    }
    e.style.transformOrigin = transformOrigin;
  };
  const handleCancel = () => {
    onCancel && onCancel();
  };
  const handleOk = () => {
    if (!onOk) return;
    const res = onOk();
    if (res && res.then) {
      setLoading(true);
      res
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    }
  };
  const handleMaskClick = (e: any) => {
    if (!maskClosable || !mask) return;
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };
  const headerEle = title && (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-title`}>{title}</div>
    </div>
  );
  const renderFooter = () => {
    if (footer === null) return;
    const cancelButtonNode = (
      <Button onClick={handleCancel} {...cancelButtonProps}>
        {cancelText || "cancel"}
      </Button>
    );
    const okButtonNode = (
      <Button onClick={handleOk} {...okButtonProps} type="primary">
        {okText || "ok"}
      </Button>
    );
    return (
      <div className={`${prefixCls}-footer`}>
        {footer ? (
          footer
        ) : (
          <>
            {!hideCancel && cancelButtonNode}
            {okButtonNode}
          </>
        )}
      </div>
    );
  };
  const closeEle = closable && (
    <span className={`${prefixCls}-icon-close`} onClick={handleCancel}>
      {closeIcon ? closeIcon : <IconClose />}
    </span>
  );
  const maskEle = mask && <div className={`${prefixCls}-mask`} />;
  const element = (
    <div
      className={cls(
        `${prefixCls}`,
        {
          [`${prefixCls}-simple`]: !!simple,
        },
        className
      )}
      style={style}
    >
      {headerEle}
      <div className={`${prefixCls}-content`}>{children}</div>
      {renderFooter()}
      {closeEle}
    </div>
  );
  return (
    <PortalWrapper visible={visible} forceRender={!mountOnEnter}>
      {/* {visible && ( */}
      {mask ? (
        <CSSTransition
          in={visible}
          timeout={400}
          classNames="fadeModal"
          unmountOnExit={unmountOnExit}
          onEnter={(e: any) => {
            e.style.display = "block";
          }}
          onExited={(e: any) => {
            e.style.display = "none";
          }}
        >
          {maskEle}
        </CSSTransition>
      ) : null}
      {visible && (
        <div
          {...rest}
          className={cls(
            `${prefixCls}-wrapper`,
            `${prefixCls}-wrapper-align-center`
          )}
          ref={wrapperRef}
          onClick={handleMaskClick}
        >
          <CSSTransition
            in={visible}
            timeout={400}
            appear
            classNames="zoomModal"
            unmountOnExit={unmountOnExit}
            mountOnEnter={mountOnEnter}
            onEnter={(e: any) => {
              console.log("onEnter");
              //setWrapperVisible(true);
              cursorPositionRef.current = cursorPosition;
              haveOriginTransformOrigin.current = !!e.style.transformOrigin;
              setTransformOrigin(e);
            }}
            onEntered={(e: any) => {
              console.log("onEntered");
              setTransformOrigin(e);
              cursorPositionRef.current = null;
              afterOpen && afterOpen();
            }}
            onExited={(e: any) => {
              console.log("onExited");
              //setWrapperVisible(false);
              setTransformOrigin(e);
              afterClose && afterClose();
            }}
          >
            {element}
          </CSSTransition>
        </div>
      )}
      {/* )} */}
    </PortalWrapper>
  );
}
type ModalReturnProps = {
  update: (props: ConfirmProps) => void;
  close: () => void;
};
interface ModalComponent
  extends ForwardRefExoticComponent<PropsWithChildren<Partial<ModalType>>> {
  confirm: (props: ConfirmProps) => ModalReturnProps;
  info: (props: ConfirmProps) => ModalReturnProps;
  success: (props: ConfirmProps) => ModalReturnProps;
  warning: (props: ConfirmProps) => ModalReturnProps;
  error: (props: ConfirmProps) => ModalReturnProps;
  destroyAll: () => void;
  useModal: typeof useModal;
}
const Modal = forwardRef(ComponentRef) as ModalComponent;

Modal.displayName = "Modal";
Modal.confirm = (config: ConfirmProps): ModalReturnProps => {
  return confirm(config);
};
Modal.useModal = useModal;
const megType = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};
type noticeType = keyof typeof megType;
(Object.keys(megType) as noticeType[]).forEach((type: noticeType) => {
  Modal[type] = (props: ConfirmProps) => {
    return confirm({
      ...props,
      isNotice: true,
      type,
    });
  };
});
Modal.destroyAll = () => {
  while (destoryList.length) {
    const fn = destoryList.pop();
    if (fn) fn();
  }
};
export default Modal;
