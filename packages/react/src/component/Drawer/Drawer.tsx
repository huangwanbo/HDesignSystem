import React, { forwardRef, CSSProperties, ReactNode } from "react";
import Button, { ButtonProps } from "../Button";
import { PortalWrapper } from "../Portal";
import { IconClose } from "@DS/Icon";
import { CSSTransition } from "react-transition-group";
import cls from "classNames";
const prefixCls = "ds-drawer";
const placementType = Object.freeze({
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
});
type DrawerType = {
  style: CSSProperties;
  className: string | string[];
  wrapClassName: string | string[];
  title: ReactNode;
  footer: ReactNode;
  headerStyle: CSSProperties;
  bodyStyle: CSSProperties;
  maskStyle: CSSProperties;
  okText: string;
  cancelText: string;
  okButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;
  placement: keyof typeof placementType;
  width: number | string;
  height: number | string;
  mask: boolean;
  closable: boolean;
  maskClosable: boolean;
  confirmLoading: boolean;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  onOk: (e: Event) => void;
  onCancel: (e: Event) => void;
  afterOpen: () => void;
  afterClose: () => void;
  getPopupContainer: () => Element;
  children: ReactNode;
  visible: boolean;
};

function ComponentRef(props: DrawerType, ref: any) {
  const {
    style,
    className,
    children,
    mask = true,
    headerStyle,
    bodyStyle,
    maskStyle,
    title,
    onCancel,
    onOk,
    okText,
    cancelText,
    okButtonProps,
    cancelButtonProps,
    footer,
    width,
    visible,
    closable = true,
    unmountOnExit = true,
    mountOnEnter = true,
    placement = placementType.right,
    afterOpen,
    afterClose,
    wrapClassName,
    maskClosable,
    getPopupContainer = () => document.body,
  } = props;
  const handlerOK = (e: any) => {
    onOk && onOk(e);
  };
  const handlerCancel = (e: any) => {
    onCancel && onCancel(e);
  };
  const getWidth = () => {
    return (width ? width : 250) + "px";
  };
  const createPlacementStyle = () => {
    if (placement == placementType.left || placement == placementType.right) {
      return {
        width: getWidth(),
      };
    } else {
      return {
        height: getWidth(),
      };
    }
  };

  const handleMaskClick = (e: any) => {
    if (!maskClosable || !mask) return;
    if (e.target === e.currentTarget) {
      handlerCancel(e);
    }
  };

  const renderFooter = (
    <>
      <Button {...cancelButtonProps} onClick={handlerCancel}>
        {cancelText || "关闭"}
      </Button>
      <Button {...okButtonProps} onClick={handlerOK}>
        {okText || "确定"}
      </Button>
    </>
  );
  return (
    <PortalWrapper visible={visible} getContainer={getPopupContainer}>
      {visible && (
        <div
          className={cls(`${prefixCls}-wrapper`, wrapClassName)}
          style={{
            position:
              getPopupContainer && getPopupContainer() != document.body
                ? "absolute"
                : "fixed",
          }}
          ref={ref}
          onClick={handleMaskClick}
        >
          {mask && (
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
              <div className={cls(`${prefixCls}-mask`)} style={maskStyle}></div>
            </CSSTransition>
          )}
          <div onClick={handleMaskClick}>
            <CSSTransition
              in={visible}
              timeout={400}
              appear
              classNames="zoomModal"
              unmountOnExit={unmountOnExit}
              mountOnEnter={mountOnEnter}
              onEntered={() => {
                afterOpen && afterOpen();
              }}
              onExited={() => {
                afterClose && afterClose();
              }}
            >
              <div
                className={cls(`${prefixCls}`, `${prefixCls}-inner`, className)}
                style={{
                  ...style,
                  ...createPlacementStyle(),
                  [placement]: "0px",
                }}
              >
                {title !== null && (
                  <div className={cls(`${prefixCls}-header`)}>
                    <div
                      className={cls(`${prefixCls}-header-title`)}
                      style={headerStyle}
                    >
                      {title}
                    </div>
                  </div>
                )}
                <div className={cls(`${prefixCls}-body`)} style={bodyStyle}>
                  {children}
                </div>
                {footer !== null && (
                  <div className={cls(`${prefixCls}-footer`)}>
                    {renderFooter}
                  </div>
                )}
                {closable && (
                  <div
                    className={cls(`${prefixCls}-close`)}
                    onClick={handlerCancel}
                  >
                    <IconClose />
                  </div>
                )}
              </div>
            </CSSTransition>
          </div>
        </div>
      )}
    </PortalWrapper>
  );
}

const Drawer = forwardRef(ComponentRef);
Drawer.displayName = "Drawer";
export default Drawer;
