import React from "react";
import Spaceing from "../../foundation/Spacing";
interface ColorProps {
    hexCode: string;
    width?: keyof typeof Spaceing;
    height?: keyof typeof Spaceing;
}
declare const Color: React.FunctionComponent<ColorProps>;
export default Color;
