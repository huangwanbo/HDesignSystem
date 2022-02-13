import React from "react";
import "@DS/scss/lib/ImagePreview.css";
interface ImagePreviewProps {
    defaultVisible?: boolean;
    src: string;
    onVisibleChange: (e: boolean) => void;
    visible: boolean;
}
declare const ImagePreview: React.ForwardRefExoticComponent<ImagePreviewProps & React.RefAttributes<HTMLElement>>;
export default ImagePreview;
