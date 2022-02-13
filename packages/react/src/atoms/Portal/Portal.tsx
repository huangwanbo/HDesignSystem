import { Component } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    /**
     * Portal 挂载容器
    */
   getContainer?: () => Element;
   childrenComponent?: Element;
}

class Portal extends Component<PortalProps> {
    container: Element | null | void = null;

    timer: NodeJS.Timeout | null = null;

    componentDidMount() {
        this.createContainer();

        this.timer = setTimeout(() => {
            if (!this.container) {
                this.createContainer();
            }
        })
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

export default Portal;