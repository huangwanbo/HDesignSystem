import React from "react";
import ImagePreview from './ImagePreview';
declare type ImageProps = {
    width?: string;
    height?: string;
    customClass?: string;
    title?: string;
    description?: string;
    src: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;
declare const Image: React.FunctionComponent<ImageProps> & {
    Preview: typeof ImagePreview;
};
export default Image;
