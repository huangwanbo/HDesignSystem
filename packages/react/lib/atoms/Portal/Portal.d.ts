/// <reference types="node" />
import { Component } from 'react';
export interface PortalProps {
    /**
     * Portal 挂载容器
    */
    getContainer?: () => Element;
    childrenComponent?: Element;
}
declare class Portal extends Component<PortalProps> {
    container: Element | null | void;
    timer: NodeJS.Timeout | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    createContainer(): void;
    render(): import("react").ReactPortal | null;
}
export default Portal;
