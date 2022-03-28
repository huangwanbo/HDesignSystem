import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import {
  IconExclamationCircleFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconInfoCircleFill,
} from "@DS/Icon";
import Modal, { ModalType } from "./Modal";
import { cloneDeep } from "lodash";
const prefix = "ds-modal";
const noticeType = Object.freeze({
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  confirm: "confirm",
});
/* 实例array */
export const destoryList: Function[] = [];
export type ConfirmProps = Partial<
  {
    content?: ReactNode;
    icon?: ReactNode | null;
    isNotice?: boolean;
    type?: keyof typeof noticeType;
  } & ModalType
>;
function renderIcon(type: keyof typeof noticeType) {
  switch (type) {
    case noticeType.warning:
      return (
        <IconExclamationCircleFill style={{ color: "var(--ds-warning-6)" }} />
      );
    case noticeType.success:
      return <IconCheckCircleFill style={{ color: "var(--ds-success-6)" }} />;
    case noticeType.error:
      return <IconCloseCircleFill style={{ color: "var(--ds-danger-6)" }} />;
    case noticeType.info:
      return <IconInfoCircleFill style={{ color: "var(--ds-primary-6)" }} />;
    default:
      return null;
  }
}
export function createTitle(config: ConfirmProps) {
  return (
    <span className={`${prefix}-title-content`}>
      {renderIcon(config.type || "confirm")}
      <span style={{ marginLeft: "12px" }}>{config.title}</span>
    </span>
  ) as any;
}
function ConfirmModal(props: ConfirmProps) {
  const { simple = true, content, ...rest } = props;
  const config = rest;
  if (props.isNotice) {
    config.title = createTitle(config) as any;
  }
  config.hideCancel = true;
  config.closable = false;
  delete config.isNotice;
  return (
    <Modal simple={simple} {...config}>
      {content}
    </Modal>
  );
}
function confirm(config: ConfirmProps) {
  let modalConfig = cloneDeep(config);
  modalConfig.visible = true;
  const onOk = () => {
    let ret;
    if (config.onOk) {
      ret = config.onOk();
    }
    if (ret && ret.then) {
      modalConfig.confirmLoading = true;
      render(modalConfig);
      ret
        .then(() => {
          onCancel(true);
        })
        .catch((e) => {
          console.error(e);
          modalConfig.confirmLoading = false;
          render(modalConfig);
        });
    }
    if (!ret) {
      onCancel(true);
    }
  };

  modalConfig.onOk = onOk;
  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  function render(props: ConfirmProps) {
    ReactDOM.render(<ConfirmModal {...props} />, wrapper);
  }

  function onCancel(isonOk?: boolean) {
    !isonOk && modalConfig.onCancel && modalConfig.onCancel();
    close();
  }
  function destory() {
    const unmountEle = ReactDOM.unmountComponentAtNode(wrapper);
    if (unmountEle && wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
    for (let i = 0; i < destoryList.length; i++) {
      const destoryFn = destoryList[i];
      if (destoryFn == close) {
        destoryList.splice(i, 1);
        break;
      }
    }
  }
  function update(newConfig: ConfirmProps) {
    modalConfig = {
      ...modalConfig,
      ...newConfig,
    };
    render(modalConfig);
  }
  function close() {
    modalConfig.visible = false;
    modalConfig.afterClose = () => {
      config.afterClose && config.afterClose();
      destory();
    };

    render(modalConfig);
  }
  destoryList.push(close);
  /* first render */
  render(modalConfig);
  return { update, close };
}

export default confirm;
