import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useRef,
  ReactElement,
} from "react";
import cls from "classNames";
import Step from "./Step";
import {
  type as modeType,
  sizeType,
  directionType,
  labelPlacementType,
  statusType,
} from "./constants";
import Context from "./Context";
const prefixCls = "ds-steps";

type StepsType = {
  style: CSSProperties;
  className: string | string[];
  /* 节点类型 */
  type: keyof typeof modeType;
  /* 步骤条的尺寸 */
  size: keyof typeof sizeType;
  /* 标签描述文字放置的位置 */
  labelPlacement: keyof typeof labelPlacementType;
  /* 显示方向 */
  direction: keyof typeof directionType;
  /* 步数 */
  current: number;
  /* 结点状态 */
  status: keyof typeof statusType;
  customNode: (Icon: ReactNode) => ReactNode;
  onChange: (current: number) => void;
  /* 无线连接模式 */
  lineless: boolean;
  children: ReactNode;
  /* 箭头模式 */
  arrow: boolean;
};

function ComponentRef(props: Partial<StepsType>, ref: any) {
  const {
    current = 0,
    children,
    size = "default",
    labelPlacement = labelPlacementType.horizontal,
    status = statusType.wait,
    lineless,
    direction = "horizontal",
    onChange,
    type = "default",
    style,
  } = props;
  const currentRef = ref || useRef();
  const StepContainer = useRef(new Map<number, typeof Step>());
  const addStep = (id: number, step: typeof Step) => {
    StepContainer.current.set(id, step);
  };
  const deleteStep = (id: number) => {
    StepContainer.current.delete(id);
  };
  const handleChange = (id: number) => {
    onChange && onChange(id);
  };
  const createStatus = (id: number) => {
    if (id < current) {
      return statusType.finish;
    } else if (id === current) {
      if (status == statusType.errors) {
        return statusType.errors;
      }
      return statusType.process;
    } else {
      return statusType.wait;
    }
  };
  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      if (typeof child != typeof Step) return child;
      const idx = index + 1;
      return React.cloneElement(child as ReactElement, {
        key: idx,
        id: idx,
        status: createStatus(idx),
      });
    });
  };
  const cs = cls(prefixCls, {
    [`${prefixCls}-size-${size}`]: true,
    [`${prefixCls}-label-${labelPlacement}`]: type != modeType.dot,
    [`${prefixCls}-label-vertical`]:
      type == modeType.dot && direction == directionType.horizontal,
    [`${prefixCls}-label-horizontal`]:
      type == modeType.dot && direction == directionType.vertical,
    [`${prefixCls}-lineless`]: !!lineless,
    [`${prefixCls}-${direction}`]: true,
    [`${prefixCls}-onChange`]: !!onChange,
    [`${prefixCls}-${type}`]: true,
  });
  return (
    <Context.Provider
      value={{
        current,
        status,
        type,
        labelPlacement,
        size,
        addStep,
        deleteStep,
        handleChange,
      }}
    >
      <div
        className={cs}
        ref={currentRef}
        style={{ ...style, width: "780px", marginBottom: "60px" }}
      >
        {renderChild()}
      </div>
    </Context.Provider>
  );
}

const Component = forwardRef(ComponentRef);
const Steps = Component as typeof Component & {
  Step: typeof Step;
};
Steps.Step = Step;
Steps.displayName = "Steps";
export default Steps;
