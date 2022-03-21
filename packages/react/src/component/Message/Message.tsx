import React, { CSSProperties, ReactNode } from "react";
import ReactDOM from "react-dom";
import BaseNotice, { NoticeType } from "../_base/BaseNotice";
import cls from "classNames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const prefixCls = "ds-message";
const positionType = Object.freeze({
  top: "top",
  bottom: "bottom",
});
const messageType = Object.freeze({
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  loading: "loading",
  //normal: "normal",
});
type MessageType = {
  style?: CSSProperties;
  className?: string | string[];
  content?: string;
  showIcon?: boolean;
  Icon?: ReactNode;
  /* ms */
  duration?: number;
  onClose?: () => void;
  id?: number | string;
  position?: keyof typeof positionType;
  closable?: boolean;
  type: keyof typeof messageType;
};
/* 实例map */
let messageInstance = new Map();
/* 实例Id set */
let messageId = new Set();
/* 包裹实例warpper*/
let wrapper: HTMLDivElement;
/* 创建递增key */
function Increase() {
  let key = 0;
  return () => {
    return key++;
  };
}
const CurrentIncrease = Increase();
/* 实例注册 */
function registerInstance(id: number | string, ins: Partial<NoticeType>) {
  messageInstance.set(id, ins);
  messageId.add(id);
}
function updateInstance(id: number | string, ins: Partial<NoticeType>) {
  messageInstance.set(id, ins);
}
/* 删除实例 */
function destoryInstance(id: number | string) {
  // const ins = messageInstance.get(id);
  messageInstance.delete(id);
  messageId.delete(id);
  updateRender();
}
/* 创建实例 */
function newInstance(props: MessageType) {
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = cls(`${prefixCls}-wrapper`);
    document.body.appendChild(wrapper);
  }
  const mergerProps = {
    ...props,
    showIcon: true,
  };
  const currentId = props.id || CurrentIncrease();
  if (props.id && messageId.has(props.id)) {
    updateInstance(props.id, mergerProps);
  } else {
    registerInstance(currentId, {
      ...mergerProps,
      id: currentId,
    });
  }
  setTimeout(() => {
    destoryInstance(currentId);
  }, props.duration || 3000);
  updateRender();
  //返回手动关闭函数
  return () => {
    destoryInstance(currentId);
  };
}
/* 更新view */
function updateRender() {
  const renderChild = () => {
    const ins: ReactNode[] = [];
    messageId.forEach((id) => {
      const props = messageInstance.get(id);
      ins.push(
        <CSSTransition
          key={id as number}
          timeout={100}
          classNames="fadeIn"
          unmountOnExit
          onExit={(e) => {
            e.style.height = `${e.scrollHeight}px`;
          }}
          onExiting={(e) => {
            e.style.height = `0`;
          }}
          onExited={() => {
            props.onClose && props.onClose();
          }}
        >
          <BaseNotice {...props} key={id} />
        </CSSTransition>
      );
    });
    return ins;
  };
  ReactDOM.render(
    <TransitionGroup component={null}>{renderChild()}</TransitionGroup>,
    wrapper
  );
}

const Message: any = {};
Object.keys(messageType).forEach((type: any) => {
  Message[type] = (noticeProps: MessageType | string) => {
    const props =
      typeof noticeProps === "string" ? { content: noticeProps } : noticeProps;
    return newInstance({
      ...props,
      type,
    });
  };
});

export default Message;
