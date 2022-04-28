import React, {
  forwardRef,
  CSSProperties,
  useMemo,
  useState,
  useRef,
} from "react";
import cls from "classNames";
import dayjs from "dayjs";
import { IconClockCircle } from "@DS/Icon";
import { useMergeValue } from "../../_util/hook";
import Trigger from "../Trigger";
import Button from "../Button";
import TimeColumn from "./TimeColumn";
import { padStart } from "lodash";
const prefixCls = "ds-time-picker";
type sizeType = "mini" | "small" | "default" | "large";
type PickerType = {
  style: CSSProperties;
  className: string | string[];
  disabled: boolean;
  size: sizeType;
};
type TimePickerType = {
  onSelect: (valueString: string, value: dayjs.Dayjs) => void;
  onChange: (valueString: string, value: dayjs.Dayjs) => void;
  defaultValue: string;
  value: string;
} & PickerType;

type timeType = "h" | "m" | "s";

function ComponentRef(props: Partial<TimePickerType>, _ref: any) {
  const {
    size = "default",
    className,
    style,
    defaultValue = "",
    value: propValue,
  } = props;
  const [_value, _setValue] = useMergeValue(defaultValue, propValue);
  const [focus, setFocus] = useState(false);
  const triRef = useRef<any>();
  const [selectedList, _setSelected] = useState<
    [string | number | null, string | number | null, string | number | null]
  >([null, null, null]);
  const cs = cls(
    `${prefixCls}`,
    {
      [`${prefixCls}-${size}`]: true,
      [`${prefixCls}-focus`]: focus,
    },
    className
  );
  const onHandleSelected = (value: string | number, type: timeType) => {
    if (type === "h") {
      selectedList[0] = value;
    } else if (type === "m") {
      selectedList[1] = value;
    } else {
      selectedList[2] = value;
    }
    _setSelected([...selectedList]);
  };

  const getNow = () => {
    const now = dayjs();
    const format = (val: number) => {
      return padStart(String(val), 2, "0");
    };

    const timeArr = [
      format(now.hour()),
      format(now.minute()),
      format(now.second()),
    ];
    //@ts-ignore
    _setSelected(timeArr);
  };
  const FormatValue = () => {
    let flags = selectedList.filter((l) => l == null);
    if (flags.length > 0) return;
    _setValue(selectedList.join(":"));
  };
  const handleClick = () => {
    FormatValue();
    triRef.current?.hide();
  };
  const renderTimePickContainer = useMemo(() => {
    const getList = (type: timeType) => {
      const list = [];
      if (type === "h") {
        for (let i = 0; i < 24; i++) {
          list.push({
            value: i,
            label: i,
            selected: selectedList[0] == i,
            disabled: false,
          });
        }
      }
      if (type === "m" || type === "s") {
        for (let i = 0; i < 60; i++) {
          list.push({
            value: i,
            label: i,
            selected:
              type === "m" ? selectedList[1] == i : selectedList[2] == i,
            disabled: false,
          });
        }
      }
      return list;
    };
    const HOUSRS = getList("h");
    const MINUTES = getList("m");
    const SECONDS = getList("s");

    const HouserColumn = (
      <TimeColumn
        list={HOUSRS}
        type="h"
        onHandleSelected={onHandleSelected}
        value={selectedList[0]}
      />
    );
    const MINUTESColumn = (
      <TimeColumn
        list={MINUTES}
        type="m"
        onHandleSelected={onHandleSelected}
        value={selectedList[1]}
      />
    );
    const SECONDSColumn = (
      <TimeColumn
        list={SECONDS}
        type="s"
        onHandleSelected={onHandleSelected}
        value={selectedList[2]}
      />
    );
    const renderTimePickContainer = (
      <div className="ds-time-picker-container">
        <div className="ds-time-picker">
          {HouserColumn}
          {MINUTESColumn}
          {SECONDSColumn}
        </div>
        <div className="ds-time-picker-footer-btn-wrapper">
          <Button
            size="sm"
            onClick={() => {
              getNow();
            }}
          >
            此刻
          </Button>
          <Button size="sm" onClick={handleClick}>
            确定
          </Button>
        </div>
      </div>
    );
    return renderTimePickContainer;
  }, [selectedList]);

  return (
    <div>
      <Trigger
        popupChildren={renderTimePickContainer}
        autoAlignPopupWidth
        type="click"
        ref={triRef}
      >
        <div className={cs} style={style}>
          <div className={`${prefixCls}-input`}>
            <input
              className={cls(`${prefixCls}-start-time`, `ds-input`)}
              value={_value}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={() => {}}
              placeholder="请选择时间"
            />
          </div>
          <div className={`${prefixCls}-suffix`}>
            <span className={`${prefixCls}-suffix-icon`}>
              <IconClockCircle />
            </span>
          </div>
        </div>
      </Trigger>
    </div>
  );
}

const TimePicker = forwardRef(ComponentRef);
TimePicker.displayName = "TimePicker";
export default TimePicker;
