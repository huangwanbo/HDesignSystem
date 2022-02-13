import React, { Component } from "react";
import Portal from "./Portal";

export interface PortalWrapperProps {
  getContainer?: () => Element;
  childrenComponent?: Element;
  forceRender?: boolean;
  visible?: boolean;
}

class PortalWrapper extends Component<PortalWrapperProps> {
  static displayName = "Portal";

  static defaultProps = {
    getContainer: () => document.body,
  };

  constructor(props: PortalWrapperProps) {
    super(props);
  }

  instance: any = null;
  componentWillUnmount() {
    this.instance = null;
  }

  render() {
    const { forceRender, visible } = this.props;
    return forceRender || visible || this.instance ? (
      <Portal ref={(ref) => (this.instance = ref)} {...this.props} />
    ) : null;
  }
}

export default PortalWrapper;
