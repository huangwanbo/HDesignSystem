import React from 'react';
import Spaceing from '../../foundation/Spacing.js';

const Color = ({ hexCode, width = Spaceing.sm, height = Spaceing.sm, }) => {
    const className = `ds-width-${width} ds-height-${height}`;
    return (React.createElement("div", { className: className, style: {
            backgroundColor: hexCode,
            width,
            height,
        } }));
};

export { Color as default };
//# sourceMappingURL=Color.js.map
