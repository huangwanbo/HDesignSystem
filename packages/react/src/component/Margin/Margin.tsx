import React from "react";
import Spaceing from "../../foundation/Spacing";
interface MarginProps {
  space?: keyof typeof Spaceing;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}
const Color: React.FunctionComponent<MarginProps> = ({
  space = "xxxs",
  children,
  left,
  right,
  top,
  bottom,
}) => {
  let className = ``;
  if (!left && !right && !top && !bottom) className = `ds-margin-${space}`;
  if (left) className += ` ds-margin-${left}`;
  if (right) className += ` ds-margin-${right}`;
  if (top) className += ` ds-margin-${top}`;
  if (bottom) className += ` ds-margin-${bottom}`;
  return <div className={className}>{children}</div>;
};

export default Color;
