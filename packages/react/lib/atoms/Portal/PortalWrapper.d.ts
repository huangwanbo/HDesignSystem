import { Component } from "react";
export interface PortalWrapperProps {
    getContainer?: () => Element;
    childrenComponent?: Element;
    forceRender?: boolean;
    visible?: boolean;
}
declare class PortalWrapper extends Component<PortalWrapperProps> {
    static displayName: string;
    static defaultProps: {
        getContainer: () => HTMLElement;
    };
    constructor(props: PortalWrapperProps);
    instance: any;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
}
export default PortalWrapper;
