import React, { useState, useCallback, useEffect } from "react";
import cls from "classNames";
import FontSize from "../../foundation/FontSize";
import Icon from "../Icon";
import Text from "../Text";
import debounce from 'lodash/debounce';
const prefixCls = `ds-spin`;
interface SpinProps {
  size?: keyof typeof FontSize;
  tip?: string;
  icon?: string;
  loading: boolean;
  customStyle?: React.CSSProperties;
  customClass?: string;
  delay?: number;
}

function Spin(props: SpinProps, ref: any) {
  const { size = "base", tip, customStyle, customClass, loading: propLoading, delay } = props;
  const [loading, setLoading] = useState<boolean>(delay ? false : propLoading);
  const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay]);

  useEffect(() => {
    delay && debouncedSetLoading(propLoading);
    return () => {
      debouncedSetLoading && debouncedSetLoading.cancel();
    }
  }, [propLoading]);

  const classNames = cls(
    {
      [`${prefixCls}-block`]: true,
    },
    customClass
  );
  return (
    loading ? <div ref={ref} style={customStyle} className={classNames}>
      <Icon
        name="refresh"
        size={size}
        customClass={`${prefixCls}-loading`}
        customStyle={{

        }}
      ></Icon>
      {tip && (
        <div className={`${prefixCls}-tip`}>
          <Text>{tip}</Text>
        </div>
      )}
    </div> : null
  );
}

const SpinRef = React.forwardRef<unknown, SpinProps>(Spin);
SpinRef.displayName = "Spin";
export default SpinRef;
