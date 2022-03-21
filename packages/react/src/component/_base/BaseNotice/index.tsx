import React, { forwardRef, CSSProperties, ReactNode } from "react";
import {
  IconInfoCircleFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconClose,
  IconLoading,
} from "@DS/Icon";
import cls from "classNames";
const prefixCls = "ds-notice";
const noticeType = Object.freeze({
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  loading: "loading",
  //normal: "normal",
});
export type NoticeType = {
  style: CSSProperties;
  className: string | string[];
  content: string;
  showIcon: boolean;
  Icon: ReactNode;
  /* ms */
  duration: number;
  onClose: () => void;
  id: string | number;
  closable: boolean;
  type: keyof typeof noticeType;
  title: string;
  closeElement: ReactNode;
};

function ComponentRef(props: Partial<NoticeType>, ref: any) {
  const {
    type,
    onClose,
    title,
    content,
    showIcon,
    style,
    className,
    closeElement,
    closable,
  } = props;
  const handleClose = (e: any) => {
    console.log(e);
    onClose && onClose();
  };
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-with-title`]: !!title,
    },
    className
  );
  const renderIcon = () => {
    switch (type) {
      case noticeType.warning:
        return (
          <IconExclamationCircleFill style={{ color: "var(--ds-warning-6)" }} />
        );
      case noticeType.success:
        return <IconCheckCircleFill style={{ color: "var(--ds-success-6)" }} />;
      case noticeType.error:
        return <IconCloseCircleFill style={{ color: "var(--ds-danger-6)" }} />;
      case noticeType.loading:
        return <IconLoading />;
      case noticeType.info:
      default:
        return <IconInfoCircleFill style={{ color: "var(--ds-primary-6)" }} />;
    }
  };
  return (
    <div className={cs} style={style} ref={ref}>
      {showIcon && <div className={`${prefixCls}-icon`}>{renderIcon()}</div>}
      <div className={`${prefixCls}-content-wrapper`}>
        <div className={`${prefixCls}-title`}>{title}</div>
        <div className={`${prefixCls}-content`}>{content}</div>
      </div>
      {closable && (
        <button className={`${prefixCls}-close`} onClick={handleClose}>
          {closeElement ? closeElement : <IconClose />}
        </button>
      )}
    </div>
  );
}

const Notice = forwardRef(ComponentRef);
Notice.displayName = "Notice";
export default Notice;
