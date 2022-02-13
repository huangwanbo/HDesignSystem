import React from "react";
import Spaceing from "../../foundation/Spacing";
interface MarginProps {
    space?: keyof typeof Spaceing;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Color: React.FunctionComponent<MarginProps>;
export default Color;
