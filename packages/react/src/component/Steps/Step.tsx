import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import cls from "classNames";
import {
  labelPlacementType,
  statusType,
  type as modeType,
  sizeType,
} from "./constants";
import Context from "./Context";
import { IconCheck, IconClose } from "@DS/Icon";
const prefixCls = "ds-steps";

type StepsType = {
  style?: CSSProperties;
  className?: string | string[];
  id: number;
  /* 节点标题 */
  title: string | ReactNode;
  /* 节点描述 */
  description?: string | ReactNode;
  /* 节点状态 */
  status: keyof typeof statusType;
  disabled?: boolean;
  icon?: ReactNode;
};

function ComponentRef(props: Partial<StepsType>, ref: any) {
  const {
    current,
    status: currentStatus,
    type,
    size,
    addStep,
    deleteStep,
    labelPlacement,
    handleChange,
  } = useContext(Context);
  const { style, className, id, title, description, status, icon } = props;
  const currentRef = ref || useRef();
  const registerStep = () => {
    addStep && addStep(id as number, currentRef.current);
  };
  const unRegisterStep = () => {
    deleteStep && deleteStep(id as number);
  };
  useEffect(() => {
    if (currentRef.current) {
      registerStep();
    }
    return () => {
      unRegisterStep();
    };
  }, []);
  const cs = cls(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-${status}`]: true,
      [`${prefixCls}-active`]: current === id,
      [`${prefixCls}-item-next-error`]:
        current - 1 === id && currentStatus === statusType.errors,
    },
    className
  );
  const renderIcon = () => {
    switch (status) {
      case statusType.wait:
      case statusType.process:
        return id;
      case statusType.finish:
        return <IconCheck />;
      case statusType.errors:
        return <IconClose />;
      default:
        return id;
    }
  };
  const renderTypeIcon = () => {
    switch (type) {
      case modeType.default:
        return renderIcon();
      case modeType.arrow:
      case modeType.dot:
      case modeType.navigation:
      default:
        return null;
    }
  };
  return (
    <div
      className={cs}
      style={style}
      ref={currentRef}
      onClick={() => {
        handleChange(id as number);
      }}
    >
      {type !== modeType.arrow && (
        <div className={cls(`${prefixCls}-item-icon`)}>
          <div className={cls(`${prefixCls}-icon`)}>
            {icon ? icon : renderTypeIcon()}
          </div>
        </div>
      )}
      {labelPlacement == labelPlacementType.vertical ||
        (type == modeType.dot && (
          <div className={cls(`${prefixCls}-item-tail`)}></div>
        ))}
      <div className={cls(`${prefixCls}-item-content`)}>
        <div className={cls(`${prefixCls}-item-title`)}>{title}</div>

        {type == modeType.arrow && size == sizeType.small && (
          <div className={cls(`${prefixCls}-item-dec`)}>{description}</div>
        )}
      </div>
    </div>
  );
}

const Steps = forwardRef(ComponentRef);
Steps.displayName = "Steps";
export default Steps;
