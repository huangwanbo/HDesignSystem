import React from 'react';
import PortalWrapper from '../Portal/PortalWrapper.js';
import cls from 'classNames';
import useImageState from './useImageState.js';
import SpinRef from '../Spin/Spin.js';
import Icon from '../Icon/Icon.js';
import '@DS/scss/lib/ImagePreview.css';

const prefixCls = "ds-Image__Preview";
function Preview(props) {
    const { visible, src, onVisibleChange } = props;
    const { isLoading, setState } = useImageState("Loading");
    const markCls = cls({
        [`${prefixCls}-mask`]: true,
    });
    const imgCls = cls({
        [`${prefixCls}-imgWrapper-img`]: true,
    });
    const wrapperCls = cls({
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-hide`]: !visible,
    });
    const closeBtnCls = cls({
        [`${prefixCls}-close`]: true,
    });
    function onOutsideImgClick(e) {
        if (e.target === e.currentTarget) {
            close();
        }
    }
    function close() {
        onVisibleChange(false);
        //setState("Loading");
    }
    const onLoad = () => {
        setState("loaded");
    };
    return (React.createElement(PortalWrapper, { visible: visible },
        React.createElement("div", { className: wrapperCls },
            React.createElement("div", { className: markCls }),
            isLoading && (React.createElement("div", { className: `${prefixCls}-loading` },
                React.createElement(SpinRef, { loading: isLoading, size: "sm" }))),
            React.createElement("div", { className: cls(`${prefixCls}-imgWrapper`), style: { transform: "scale(1,1)" }, onClick: onOutsideImgClick },
                React.createElement("div", { className: cls(`${prefixCls}-imgWrapper-container`), onClick: onOutsideImgClick },
                    React.createElement("img", { className: imgCls, src: src, onLoad: onLoad }),
                    React.createElement(Icon, { name: "close", size: "xs", customClass: closeBtnCls, onClick: onOutsideImgClick }))))));
}
const ImagePreview = React.forwardRef(Preview);

export { ImagePreview as default };
//# sourceMappingURL=ImagePreview.js.map
