import React, {
  forwardRef,
  CSSProperties,
  ReactNode,
  useMemo,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import cls from "classNames";
import { padEnd } from "lodash";
//@ts-ignore
import BTween from "../../_util/b-tween";
import CountDown from "./Countdown";
import dayjs from "dayjs";
const prefixCls = "ds-statistic";

type StatisticType = {
  className: string | string[];
  style: CSSProperties;
  styleValue: CSSProperties;
  title: string;
  value: number;
  countDuration: number;
  countFrom: number;
  precision: number;
  prefix: ReactNode;
  suffix: ReactNode;
  countUp: boolean;
  format: string;
};

function ComponentRef(props: Partial<StatisticType>, ref: any) {
  const {
    className,
    style,
    title,
    precision = 0,
    prefix,
    suffix,
    styleValue,
    format,
  } = props;
  const tween = useRef<typeof BTween | null>();
  const [value, setValue] = useState<number>(props.value || 0);
  const cs = cls(prefixCls, className);
  const countUp = (from = props.countFrom, to = props.value) => {
    if (from !== to) {
      //@ts-ignore
      tween.current = new BTween({
        from: {
          value: from,
        },
        to: {
          value: to,
        },
        duration: props.countDuration,
        easing: "quartOut",
        onUpdate: (keys: any) => {
          setValue(keys.value.toFixed(precision));
        },
        onFinish: () => {
          setValue(to as number);
        },
      });
      //@ts-ignore
      tween.current.start();
    }
  };

  useEffect(() => {
    if (props.countUp) {
      if (tween.current) {
        //@ts-ignore
        tween.current.stop();
      }
      if (value !== props.value) {
        countUp(value, props.value);
      } else {
        countUp();
      }
    } else {
      setValue(props.value as number);
    }
    return () => {
      // @ts-ignore
      tween.current && tween.current.stop();
      tween.current = null;
    };
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    countUp,
  }));
  /* 123.45 -> 123*/
  function getInt(value: number): string {
    return String(value).split(".")[0];
  }
  /* 123.45 -> 45*/
  function getDecimal(value: number): string {
    const decimal = String(value).split(".")[1];
    if (precision) {
      console.log(precision, padEnd(decimal, precision, "0"));

      return padEnd(decimal, precision, "0");
    }
    return decimal;
  }
  /*12345 -> 12,345 */
  function getSeparator(int: string): string {
    return Number(int).toLocaleString("en-US");
  }
  function getDate(
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ): string {
    return dayjs(date).format(format);
  }
  // function pipe() {
  //     //a,b,c -> c(b(a()))
  //     const fns = new Array(...arguments);
  //     return fns.reduce((a, b) => {
  //         return b(a);
  //     })
  // }
  const { int, decimal } = useMemo(() => {
    let int = null,
      decimal = null;
    if (format) {
      int = getDate(value);
      return { int, decimal };
    }
    int = getSeparator(getInt(value));
    decimal = getDecimal(value);
    return { int, decimal };
  }, [precision, value, format]);
  return (
    <div ref={ref} style={style} className={cs}>
      {title && <div className={cls(`${prefixCls}-title`)}>{title}</div>}
      <div className={cls(`${prefixCls}-value`)} style={styleValue}>
        {prefix && (
          <span className={cls(`${prefixCls}-value-prefix`)}>{prefix}</span>
        )}
        <span className={cls(`${prefixCls}-value-int`)}>{int}</span>
        {decimal && (
          <span
            className={cls(`${prefixCls}-value-decimal`)}
          >{`.${decimal}`}</span>
        )}
        {suffix && (
          <span className={cls(`${prefixCls}-value-suffix`)}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

const Component = forwardRef(ComponentRef);
const Statistic = Component as typeof Component & {
  CountDown: typeof CountDown;
};
Statistic.defaultProps = {
  countFrom: 0,
  countDuration: 2000,
};
Statistic.displayName = "Statistic";
Statistic.CountDown = CountDown;
export default Statistic;
