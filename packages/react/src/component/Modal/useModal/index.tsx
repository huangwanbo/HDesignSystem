import React, {
  createRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import Modal from "../Modal";
import { destoryList, ConfirmProps, createTitle } from "../Comfirm";
import ContextHolderElement, { HolderRef } from "./ContextHolder";

type HookModalRef = {
  update: (config: ConfirmProps) => void;
  close: () => void;
};

const HookModal = forwardRef(function HookModal(props: ConfirmProps, ref: any) {
  const [visible, setVisible] = useState(true);
  const [config, setConfig] = useState<ConfirmProps>(props);

  useImperativeHandle(ref, () => ({
    update: setConfig,
    close: () => {
      setVisible(false);
    },
  }));

  const onOk = () => {
    let ret;
    if (config.onOk) {
      ret = config.onOk();
    }
    if (ret && ret.then) {
      setConfig({
        ...config,
        confirmLoading: true,
      });
      ret
        .then(() => {
          setVisible(false);
        })
        .catch((e) => {
          console.error(e);

          setConfig({
            ...config,
            confirmLoading: false,
          });
        });
    }
    if (!ret) {
      setVisible(false);
    }
  };
  function onCancel() {
    config.onCancel && config.onCancel();
    setVisible(false);
  }
  return (
    <Modal {...config} simple visible={visible} onOk={onOk} onCancel={onCancel}>
      {config.content}
    </Modal>
  );
});

type hookModalFunction = (config: ConfirmProps) => {
  close: () => void;
  update: (config: ConfirmProps) => void;
};

export type modalFunctionsType = {
  confirm?: hookModalFunction;
  info?: hookModalFunction;
  success?: hookModalFunction;
  warning?: hookModalFunction;
  error?: hookModalFunction;
};

function useModal(): [Partial<modalFunctionsType>, HolderRef] {
  const contextHolderRef = createRef<HolderRef>();
  const holderEle: HolderRef = (
    <ContextHolderElement ref={contextHolderRef} />
  ) as HolderRef;
  let id = 0;
  function newInstance(props: ConfirmProps) {
    id++;
    const modalRef = createRef<HookModalRef>();
    const config = props;
    if (props.isNotice) {
      config.title = createTitle(config) as any;
    }
    config.hideCancel = true;
    config.closable = false;
    delete config.isNotice;
    const Modal = <HookModal key={id} ref={modalRef} {...config} />;
    //@ts-ignore
    contextHolderRef.current.addInstance(Modal);
    function removeMOdalInstance() {
      //@ts-ignore
      contextHolderRef.current?.removeInstance(Modal);
    }
    console.log(modalRef.current);

    function close() {
      modalRef.current!.close();
      removeMOdalInstance();
    }
    function update(config: ConfirmProps) {
      modalRef.current!.update(config);
    }
    destoryList.push(close);
    return {
      close,
      update,
    };
  }
  const modalFuncs: modalFunctionsType = {};
  const megType = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
    confirm: "confirm",
  };
  type noticeType = keyof typeof megType;
  (Object.keys(megType) as noticeType[]).forEach((type: noticeType) => {
    modalFuncs[type] = (props: ConfirmProps) => {
      return newInstance({
        ...props,
        isNotice: type != "confirm",
        type,
      });
    };
  });
  return [modalFuncs, holderEle];
}

export default useModal;
