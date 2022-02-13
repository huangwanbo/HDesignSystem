import React from "react";
import FontSize from "../../foundation/FontSize";
interface TextProps {
    size?: keyof typeof FontSize;
}
declare const Text: React.FunctionComponent<TextProps>;
export default Text;
