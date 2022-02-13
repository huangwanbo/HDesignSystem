import React from "react";
import FontSize from "../../foundation/FontSize";
interface TextProps {
  size?: keyof typeof FontSize;
}
const Text: React.FunctionComponent<TextProps> = ({
  size = "base",
  children,
}) => {
  const className = `ds-font-size-${size}`;
  return <div className={className}>{children}</div>;
};

export default Text;
