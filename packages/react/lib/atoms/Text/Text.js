import React from 'react';

const Text = ({ size = "base", children, }) => {
    const className = `ds-font-size-${size}`;
    return React.createElement("div", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
