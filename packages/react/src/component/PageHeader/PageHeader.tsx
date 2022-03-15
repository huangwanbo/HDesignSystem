import React, { forwardRef, CSSProperties, ReactNode } from "react";
import cls from "classNames";
import Breadcrumb, { BreadcrumbType } from "../Breadcrumb";
import { IconArrowLeft } from "@DS/Icon";
const prefixCls = "ds-page-head";

type PageHeaderType = {
  className?: string | string[];
  style?: CSSProperties;
  title: ReactNode;
  subTitle?: ReactNode;
  extra?: ReactNode;
  footer?: ReactNode;
  breadcrumb?: BreadcrumbType;
  backIcon?: ReactNode;
  children?: ReactNode;
  onBack?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

function ComponentRef(props: PageHeaderType, ref: any) {
  const {
    style,
    className,
    title,
    subTitle,
    breadcrumb,
    extra,
    onBack,
    backIcon,
    footer,
    children,
  } = props;
  const cs = cls(
    prefixCls,
    {
      [`${prefixCls}-with-breadcrumb`]: !!breadcrumb,
      [`${prefixCls}-with-content`]: !!children,
    },
    className
  );
  const renderBreadcrumb = () => {
    return <Breadcrumb {...breadcrumb} />;
  };
  const onHandleBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onBack && onBack(e);
  };
  return (
    <div className={cs} style={style} ref={ref}>
      <div className={`${prefixCls}-wrapper`}>
        {breadcrumb && renderBreadcrumb()}
        <div className={`${prefixCls}-main`}>
          {onBack && (
            <span className={`${prefixCls}-back`} onClick={onHandleBack}>
              {backIcon ? backIcon : <IconArrowLeft />}
            </span>
          )}
          <div className={`${prefixCls}-title`}>{title}</div>
          <div className={`${prefixCls}-divider`}></div>
          <div className={`${prefixCls}-sub-title`}>{subTitle}</div>
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
      {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
    </div>
  );
}

const PageHeader = forwardRef(ComponentRef);
PageHeader.displayName = "PageHeader";
export default PageHeader;
