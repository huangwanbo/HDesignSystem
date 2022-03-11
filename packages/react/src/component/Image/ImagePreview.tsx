import React from "react";
import PortalWrapper from "../Portal/PortalWrapper";
import cls from "classNames";
import useImageState from "./useImageState";
import Loading from "../Spin";
import Icon from "../Icon";
import "@DS/scss/lib/ImagePreview.css";
const prefixCls = "ds-Image__Preview";

interface ImagePreviewProps {
  defaultVisible?: boolean;
  src: string;
  onVisibleChange: (e: boolean) => void;
  visible: boolean;
}

function Preview(props: ImagePreviewProps) {
  const { visible, src, onVisibleChange } = props;
  const { isLoading, setState } = useImageState("Loading");
  const markCls = cls({
    [`${prefixCls}-mask`]: true,
  });
  const imgCls = cls({
    [`${prefixCls}-imgWrapper-img`]: true,
  });
  const wrapperCls = cls({
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-hide`]: !visible,
  });
  const closeBtnCls = cls({
    [`${prefixCls}-close`]: true,
  });

  function onOutsideImgClick(e: any) {
    if (e.target === e.currentTarget) {
      close();
    }
  }

  function close() {
    onVisibleChange(false);
    //setState("Loading");
  }

  const onLoad = () => {
    setState("loaded");
  };
  return (
    <PortalWrapper visible={visible}>
      <div className={wrapperCls}>
        <div className={markCls}></div>
        {isLoading && (
          <div className={`${prefixCls}-loading`}>
            <Loading loading={isLoading} size="sm" />
          </div>
        )}
        <div
          className={cls(`${prefixCls}-imgWrapper`)}
          style={{ transform: "scale(1,1)" }}
          onClick={onOutsideImgClick}
        >
          <div
            className={cls(`${prefixCls}-imgWrapper-container`)}
            onClick={onOutsideImgClick}
          >
            <img className={imgCls} src={src} onLoad={onLoad} />
            <Icon
              name="close"
              size="xs"
              customClass={closeBtnCls}
              onClick={onOutsideImgClick}
            />
          </div>
        </div>
      </div>
    </PortalWrapper>
  );
}

const ImagePreview = React.forwardRef<HTMLElement, ImagePreviewProps>(Preview);
export default ImagePreview;
