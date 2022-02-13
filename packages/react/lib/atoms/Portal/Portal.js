import { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
    container = null;
    timer = null;
    componentDidMount() {
        this.createContainer();
        this.timer = setTimeout(() => {
            if (!this.container) {
                this.createContainer();
            }
        });
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    createContainer() {
        const { getContainer } = this.props;
        this.container = getContainer && getContainer();
        this.forceUpdate();
    }
    render() {
        const { children } = this.props;
        if (this.container) {
            return ReactDOM.createPortal(children, this.container);
        }
        return null;
    }
}

export { Portal as default };
//# sourceMappingURL=Portal.js.map
