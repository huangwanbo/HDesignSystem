import React, { Component } from 'react';
import Portal from './Portal.js';

class PortalWrapper extends Component {
    static displayName = "Portal";
    static defaultProps = {
        getContainer: () => document.body,
    };
    constructor(props) {
        super(props);
    }
    instance = null;
    componentWillUnmount() {
        this.instance = null;
    }
    render() {
        const { forceRender, visible } = this.props;
        return forceRender || visible || this.instance ? (React.createElement(Portal, { ref: (ref) => (this.instance = ref), ...this.props })) : null;
    }
}

export { PortalWrapper as default };
//# sourceMappingURL=PortalWrapper.js.map
