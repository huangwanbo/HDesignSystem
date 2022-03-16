import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useState,
  useRef,
  ReactElement,
} from "react";
import cls from "classNames";
import Step from "./Step";
import {
  type,
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
  type: keyof typeof type;
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
};

function ComponentRef(props: Partial<StepsType>, ref: any) {
  const {
    current: PropCurrent = 0,
    children,
    size = "default",
    labelPlacement = labelPlacementType.horizontal,
    status = statusType.wait,
  } = props;
  const currentRef = ref || useRef();
  const [current, setCurrent] = useState(PropCurrent);
  const StepContainer = useRef(new Map<number, typeof Step>());
  const addStep = (id: number, step: typeof Step) => {
    StepContainer.current.set(id, step);
  };
  const deleteStep = (id: number) => {
    StepContainer.current.delete(id);
  };
  const handleChange = (id: number) => {
    setCurrent(id);
  };
  const createStatus = (id: number) => {
    if (id == current && status) {
      return statusType.errors;
    }
    if (id < current) {
      return statusType.finish;
    } else if (id === current) {
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
    [`${prefixCls}-label-${labelPlacement}`]: true,
  });
  return (
    <Context.Provider
      value={{
        current,
        status,
        labelPlacement,
        addStep,
        deleteStep,
        handleChange,
      }}
    >
      <div className={cs} ref={currentRef}>
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
