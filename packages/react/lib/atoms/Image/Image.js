import React from 'react';
import cls from 'classNames';
import Icon from '../Icon/Icon.js';
import useImageState from './useImageState.js';
import ImagePreview from './ImagePreview.js';

const prefix = "ds-image__container";
const baseStyle = cls({
    [`${prefix}-hide`]: true,
});
const Img = (props, ref) => {
    const { src, customClass } = props;
    const imgRef = ref || React.useRef(null);
    const { loaded, setState } = useImageState();
    const [imgStyle, setImgStyle] = React.useState(baseStyle);
    React.useEffect(() => {
        if (!imgRef.current)
            return;
        imgRef.current.src = src;
    }, [src]);
    const onLoad = () => {
        setImgStyle(cls({
            [`${prefix}-show`]: true,
        }));
        setState("loaded");
    };
    const unLoadedDOM = (React.createElement(Icon, { name: "photo", customStyle: {
            fontSize: "4rem",
        } }));
    const loadedDOM = (React.createElement("img", { className: imgStyle, ...props, ref: imgRef, src: src, onLoad: onLoad }));
    return (React.createElement("div", { className: cls(prefix, {
            [`${prefix}-default`]: true,
        }, customClass) },
        loadedDOM,
        !loaded && unLoadedDOM));
};
const RefImage = React.forwardRef(Img);
const Image = RefImage;
Image.displayName = "Image";
Image.Preview = ImagePreview;

export { Image as default };
//# sourceMappingURL=Image.js.map
