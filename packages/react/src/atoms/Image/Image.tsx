import React from "react";
import cls from "classNames";
import Icon from "../Icon";
import useImageState from "./useImageState";
import ImagePreview from './ImagePreview';
const prefix = "ds-image__container";
 type ImageProps = {
    width?: string,
    height?: string,
    customClass?: string,
    title?: string,
    description?: string,
    src: string,
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

const baseStyle = cls({
  [`${prefix}-hide`]: true,
});
const Img = (props: ImageProps, ref: React.LegacyRef<HTMLImageElement>) => {
  const { src, customClass } = props;
  const imgRef = (ref as any) || React.useRef(null);
  const { loaded, setState } = useImageState();
  const [imgStyle, setImgStyle] = React.useState(baseStyle);

  React.useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.src = src;
  }, [src]);

  const onLoad = () => {
    setImgStyle(
      cls({
        [`${prefix}-show`]: true,
      })
    );
    setState("loaded");
  };

  const unLoadedDOM = (
    <Icon
      name="photo"
      customStyle={{
        fontSize: "4rem",
      }}
    />
  );
  const loadedDOM = (
    <img
      className={imgStyle}
      {...props}
      ref={imgRef}
      src={src}
      onLoad={onLoad}
    />
  );
  return (
    <div
      className={cls(prefix, {
        [`${prefix}-default`]: true,
      }, customClass)}
    >
      {loadedDOM}
      {!loaded && unLoadedDOM}
    </div>
  );
};
const RefImage: React.FunctionComponent<ImageProps> = React.forwardRef<
  HTMLImageElement,
  ImageProps
>(Img);
const Image = RefImage as typeof RefImage & {
    Preview: typeof ImagePreview
};
Image.displayName = "Image";
Image.Preview = ImagePreview;
export default Image;
