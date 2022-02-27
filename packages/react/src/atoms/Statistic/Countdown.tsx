import React, {
  forwardRef,
  CSSProperties,
  useState,
  useRef,
  useEffect,
} from "react";
import cls from "classNames";
import dayjs from "dayjs";
import { getDateString } from "./_unit";
const prefixCls = "ds-statistic";

type CountDownType = {
  title: string;
  style: CSSProperties;
  valueStyle: CSSProperties;
  className: string | string[];
  value: number;
  now: number;
  format: string;
  start: boolean;
  onFinish: () => void;
};

function ComponentRef(props: Partial<CountDownType>, ref: any) {
  const { title, style, className, value, valueStyle, format, onFinish } =
    props;
  const now = dayjs(props.now?.valueOf() as number);
  const end = value ? dayjs(value.valueOf() as number) : dayjs();

  const [valueShow, setValueShow] = useState(
    getDateString(end.diff(now, "millisecond"), format as string)
  );
  const timerRef = useRef<NodeJS.Timer | null>(null);
  function getNow() {
    return dayjs();
  }
  function stopTimer() {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = null;
  }
  function startTimer() {
    timerRef.current = setInterval(() => {
      const _value = end.diff(getNow(), "millisecond");
      if (_value <= 0) {
        stopTimer();
        onFinish && onFinish();
      }
      const showValue = getDateString(Math.max(_value, 0), format as string);
      setValueShow(showValue);
    }, 1000 / 24);
  }

  useEffect(() => {
    if (!timerRef.current) {
      startTimer();
    }
    return () => {
      stopTimer();
    };
  }, [props.start]);
  return (
    <div ref={ref} className={cls(prefixCls, className)} style={style}>
      {title && <div className={cls(`${prefixCls}-title`)}>{title}</div>}
      <div className={cls(`${prefixCls}-content`)}>
        <div className={cls(`${prefixCls}-value`)} style={valueStyle}>
          {valueShow}
        </div>
      </div>
    </div>
  );
}

const CountDown = forwardRef(ComponentRef);
CountDown.displayName = "CountDown";
CountDown.defaultProps = {
  format: "HH:mm:ss",
};
export default CountDown;
