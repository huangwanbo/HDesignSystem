import React from "react";
import Spaceing from "../../foundation/Spacing";
interface ColorProps {
  hexCode: string;
  width?: keyof typeof Spaceing;
  height?: keyof typeof Spaceing;
}
const Color: React.FunctionComponent<ColorProps> = ({
  hexCode,
  width = Spaceing.sm,
  height = Spaceing.sm,
}) => {
  const className = `ds-width-${width} ds-height-${height}`;
  return (
    <div
      className={className}
      style={{
        backgroundColor: hexCode,
        width,
        height,
      }}
    ></div>
  );
};

export default Color;
