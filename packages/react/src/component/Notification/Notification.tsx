import React, { CSSProperties, ReactNode } from "react";
import ReactDOM from "react-dom";
import BaseNotice, { NoticeType } from "../_base/BaseNotice";
import cls from "classNames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const prefixCls = "ds-notification";
const positionType = Object.freeze({
  topLeft: "topLeft",
  topRight: "topRight",
  bottomLeft: "bottomLeft",
  bottomRight: "bottomRight",
});
const notificationType = Object.freeze({
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  loading: "loading",
  //normal: "normal",
});
type notificationType = {
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
  type: keyof typeof notificationType;
  btn?: ReactNode;
};
/* 实例map */
let notificationInstance = new Map();
/* 实例Id set */
let notificationId = new Set<string | number>();
/* 包裹实例warpper*/
let wrapper: Record<keyof typeof positionType, HTMLDivElement | null> = {
  topLeft: null,
  topRight: null,
  bottomLeft: null,
  bottomRight: null,
};

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
  notificationInstance.set(id, ins);
  notificationId.add(id);
}
function updateInstance(id: number | string, ins: Partial<NoticeType>) {
  notificationInstance.set(id, ins);
}
/* 删除实例 */
function destoryInstance(id: number | string) {
  // const ins = notificationInstance.get(id);
  notificationInstance.delete(id);
  notificationId.delete(id);
  updateRender();
}
/* 创建实例 */
function newInstance(props: notificationType) {
  if (!props.position) {
    props.position = "topRight";
  }
  if (!wrapper[props.position]) {
    wrapper[props.position] = document.createElement("div");
    wrapper[props.position]!.className = cls(
      `${prefixCls}-wrapper`,
      `${prefixCls}-wrapper-${props.position || positionType.topRight}`
    );
    document.body.appendChild(wrapper[props.position] as HTMLDivElement);
  }
  const mergerProps = {
    ...props,
    showIcon: true,
  };

  const currentId = props.id || CurrentIncrease();
  if (props.closable) {
    mergerProps.onClose = () => {
      props.onClose && props.onClose();
      destoryInstance(currentId);
    };
  }
  if (props.id && notificationId.has(props.id)) {
    updateInstance(props.id, mergerProps);
  } else {
    registerInstance(currentId, {
      ...mergerProps,
      id: currentId,
    });
  }
  // duration 为0时不设置定时器删除
  if (props.duration !== 0) {
    setTimeout(() => {
      destoryInstance(currentId);
    }, props.duration || 3000);
  }
  updateRender();
  //返回手动关闭函数
  return () => {
    destoryInstance(currentId);
  };
}
/* 更新view */
function updateRender() {
  const ins: any = {};
  Object.keys(positionType).forEach((key) => {
    ins[key] = [];
  });
  notificationId.forEach((id) => {
    const props = notificationInstance.get(id);
    ins[props.position].push(
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
  Object.keys(positionType).forEach((type) => {
    if (!wrapper[type as keyof typeof positionType]) return;
    ReactDOM.render(
      <TransitionGroup component={null}>{ins[type]}</TransitionGroup>,
      wrapper[type as keyof typeof positionType]
    );
  });
}

const Notification: any = {};
Object.keys(notificationType).forEach((type: any) => {
  Notification[type] = (noticeProps: notificationType | string) => {
    const props =
      typeof noticeProps === "string" ? { content: noticeProps } : noticeProps;
    return newInstance({
      ...props,
      type,
    });
  };
});
Notification.remove = (id: number | string) => {
  destoryInstance(id);
};

Notification.clear = () => {
  notificationId.forEach((id: number | string) => {
    destoryInstance(id);
  });
};

export default Notification;
