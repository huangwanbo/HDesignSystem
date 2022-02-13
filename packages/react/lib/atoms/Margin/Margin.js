import React from 'react';

const Color = ({ space = "xxxs", children, left, right, top, bottom, }) => {
    let className = ``;
    if (!left && !right && !top && !bottom)
        className = `ds-margin-${space}`;
    if (left)
        className += ` ds-margin-${left}`;
    if (right)
        className += ` ds-margin-${right}`;
    if (top)
        className += ` ds-margin-${top}`;
    if (bottom)
        className += ` ds-margin-${bottom}`;
    return React.createElement("div", { className: className }, children);
};

export { Color as default };
//# sourceMappingURL=Margin.js.map
