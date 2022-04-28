import React, { forwardRef, useRef, useEffect } from "react";
import cls from "classNames";
import { padStart } from "lodash";
import { debounce } from "lodash";
import { scrollTo } from "./unitl";
const prefixCls = "ds-time-picker";
export type listItem = {
  value: string | number;
  label: string | number;
  disabled: boolean;
  selected: boolean;
};
type timeType = "h" | "m" | "s";
type TimeColumnType = {
  list: listItem[];
  type: timeType;
  onHandleSelected: (value: string | number, type: timeType) => void;
  value: string | number | null;
};

function ComponentRef(props: TimeColumnType, _ref: any) {
  const { list, type, onHandleSelected, value } = props;
  const lis = useRef<Map<number | string, HTMLElement | null>>(new Map());
  const wrapper = useRef<HTMLDivElement>();
  const ul = useRef<HTMLDivElement>();
  const listItemHeight = useRef<number>(0);

  const formatLi = (li: string | number) => {
    let str: string = "";
    try {
      str = padStart(String(li), 2, "0");
    } catch (e) {
      console.log(e);
    }
    return str;
  };
  const onScrollList = debounce(() => {
    //const round = wrapper.current?.scrollTop -
  });
  useEffect(() => {
    if (list.length <= 1 && ul.current && wrapper.current) return;
    listItemHeight.current =
      (ul.current!.clientHeight - wrapper.current!.clientHeight) /
      (list.length - 1);
  }, [list.length]);
  useEffect(() => {
    if (!value) return;
    const li = lis.current.get(formatLi(value));
    if (li && wrapper.current) {
      scrollTo(wrapper.current, li.offsetTop, 150);
    }
  }, [value]);
  return (
    //@ts-ignore
    <div className={`${prefixCls}-list`} ref={wrapper} onWheel={onScrollList}>
      {
        //@ts-ignore
        <ul ref={ul}>
          {list.map((li) => {
            return (
              <li
                key={li.value}
                className={cls(`${prefixCls}-cell`, {
                  [`${prefixCls}-cell-selected`]: li.selected,
                })}
                onClick={() => {
                  !li.disabled && onHandleSelected(formatLi(li.value), type);
                }}
                ref={(el) => {
                  lis.current.set(formatLi(li.value), el);
                }}
              >
                <div className={`${prefixCls}-inner`}>{formatLi(li.label)}</div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

const TimeColumn = forwardRef(ComponentRef);
TimeColumn.displayName = "TimeColumn";
export default TimeColumn;
