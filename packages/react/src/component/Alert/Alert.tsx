import React, { forwardRef, CSSProperties, ReactNode, useState } from "react";
import {
  IconInfoCircleFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconClose,
} from "@DS/Icon";
import cls from "classNames";
import { CSSTransition } from "react-transition-group";
const prefixCls = "ds-alert";

const alertType = Object.freeze({
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
});
type AlertType = {
  style: CSSProperties;
  className: string | string[];
  action: ReactNode;
  closable: boolean;
  onClose: (e: any) => void;
  afterClose: () => void;
  type: keyof typeof alertType;
  title: ReactNode;
  content: ReactNode;
  icon: ReactNode;
  closeElement: ReactNode;
  showIcon: boolean;
  banner: boolean;
};

function ComponentRef(props: Partial<AlertType>, ref: any) {
  const {
    type = alertType.info,
    className,
    style,
    content,
    closable,
    title,
    closeElement,
    action,
    showIcon = true,
    banner,
    afterClose,
    onClose,
  } = props;
  const [close, setClose] = useState(false);
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-with-title`]: !!title,
      [`${prefixCls}-banner`]: !!banner,
    },
    className
  );
  const handleClose = (e: any) => {
    setClose(true);
    onClose && onClose(e);
  };
  const renderIcon = () => {
    switch (type) {
      case alertType.warning:
        return (
          <IconExclamationCircleFill style={{ color: "var(--ds-warning-6)" }} />
        );
      case alertType.success:
        return <IconCheckCircleFill style={{ color: "var(--ds-success-6)" }} />;
      case alertType.error:
        return <IconCloseCircleFill style={{ color: "var(--ds-danger-6)" }} />;
      case alertType.info:
      default:
        return <IconInfoCircleFill style={{ color: "var(--ds-primary-6)" }} />;
    }
  };
  return (
    <CSSTransition
      in={!close}
      timeout={300}
      classNames="zoomInTop"
      unmountOnExit
      onExited={() => {
        afterClose && afterClose();
      }}
    >
      <div className={cs} style={style} ref={ref}>
        {showIcon && <div className={`${prefixCls}-icon`}>{renderIcon()}</div>}
        <div className={`${prefixCls}-content-wrapper`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          <div className={`${prefixCls}-content`}>{content}</div>
        </div>
        {action && <div className={`${prefixCls}-action`}>{action}</div>}
        {closable && (
          <button className={`${prefixCls}-close`} onClick={handleClose}>
            {closeElement ? closeElement : <IconClose />}
          </button>
        )}
      </div>
    </CSSTransition>
  );
}

const Alert = forwardRef(ComponentRef);
Alert.displayName = "Alert";
export default Alert;
