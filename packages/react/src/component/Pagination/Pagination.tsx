import React, {
  forwardRef,
  CSSProperties,
  useMemo,
  useState,
  ReactDOM,
} from "react";
import cls from "classNames";
import { IconLeft, IconRight } from "@DS/Icon";
const prefixCls = "ds-pagination";

const sizeType = Object.freeze({
  mini: "mini",
  small: "small",
  default: "default",
  large: "large",
});
type PaginationType = {
  style: CSSProperties;
  className: string | string[];
  buttonStyle: CSSProperties;
  current: number;
  pageSize: number;
  total: number;
  disabled: boolean;
  size: keyof typeof sizeType;
  activePageItemStyle: CSSProperties;
  sizeCanChange: boolean;
  showTotal: boolean;
  onChange: (pageNumber?: number, pageSize?: number) => void;
  itemRender: (
    page: number,
    type: "prev" | "next" | null,
    originElement: ReactDOM
  ) => React.ReactElement | ReactDOM;
};

function ComponentRef(props: Partial<PaginationType>, ref: any) {
  const {
    className,
    style,
    size = sizeType.default,
    total = 200,
    pageSize = 10,
    current: PropCurrent = 5,
    showTotal = true,
    onChange,
    itemRender,
  } = props;
  const [current, SetCurrent] = useState(PropCurrent);
  const containerCls = cls(
    prefixCls,
    {
      [`${prefixCls}-size-${size}`]: true,
    },
    className
  );
  const pageListSize = useMemo(() => {
    return Math.round(total / pageSize);
  }, [total, pageSize]);
  const liDom = (i: number | string) => {
    return (
      <li
        className={cls(`${prefixCls}-item`, {
          [`${prefixCls}-item-active`]: i === current,
        })}
        data-index={i}
        data-active={i === current}
        key={i}
      >
        {i}
      </li>
    );
  };
  const prv = (
    <li
      className={cls(`${prefixCls}-item`, {
        [`${prefixCls}-item-prev`]: true,
        [`${prefixCls}-item-disabled`]: current === 1,
      })}
      key={"prv"}
      data-key="prv"
    >
      <IconLeft data-key="prv" />
    </li>
  );
  const next = (
    <li
      className={cls(`${prefixCls}-item`, {
        [`${prefixCls}-item-after`]: true,
        [`${prefixCls}-item-disabled`]: current === pageListSize,
      })}
      key={"next"}
      data-key="next"
    >
      <IconRight data-key="next" />
    </li>
  );
  const renderChild = () => {
    const list = [];
    const preOmit =
      current >= 5 ? (
        <li className={`${prefixCls}-item`} key="preOmit" data-key="preMore">
          ...
        </li>
      ) : null;
    const afterOmit =
      pageListSize - current >= 4 ? (
        <li
          className={`${prefixCls}-item`}
          key="afterOmit"
          data-key="afterMore"
        >
          ...
        </li>
      ) : null;
    for (let i = 1; i <= pageListSize; i++) {
      // 存储第一个和最后一个
      if (i == 1 || i == pageListSize) {
        if (i == pageListSize) {
          list.push(afterOmit);
        }
        list.push(liDom(i));
        if (i == 1) {
          list.push(preOmit);
        }
        continue;
      }
      //存储current为中间前后5个
      //如果小于3 加前五个
      //如果大于3，同时 小于pageListSize-3，存储current-2，current + 2
      //最后
      if (current < 3 && i <= 5) {
        list.push(liDom(i));
        continue;
      }
      if (
        i > 1 &&
        // pageListSize - current > 5 &&
        i <= pageListSize - 1 &&
        i >= current - 2 &&
        i <= current + 2
      ) {
        list.push(liDom(i));
        continue;
      }
      if (i > pageListSize - 5 && current > i && i < pageListSize) {
        list.push(liDom(i));
        continue;
      }
    }
    const renderList = [prv, ...list, next];

    if (itemRender) {
      return renderList.map((item, index) => {
        if (index === 0) {
          return React.cloneElement(item as React.ReactElement, {
            children: React.cloneElement(
              itemRender(index, "prev", item as any) as React.ReactElement,
              {
                [`data-key`]: "pre",
              }
            ),
          });
        } else if (index === renderList.length - 1) {
          return React.cloneElement(item as React.ReactElement, {
            children: React.cloneElement(
              itemRender(index, "next", item as any) as React.ReactElement,
              {
                [`data-key`]: "next",
              }
            ),
          });
        } else {
          return itemRender(index, null, item as any);
        }
      });
    }
    return renderList;
  };
  const onNext = (pos: number = 1) => {
    let nextPos = current + pos;
    nextPos = nextPos < pageListSize ? nextPos : pageListSize;
    SetCurrent(nextPos);
    onChange && onChange(nextPos, pageSize);
  };
  const onPrev = (pos: number = 1) => {
    let nextPos = current - pos;
    nextPos = nextPos > 0 ? nextPos : 1;
    SetCurrent(nextPos);
    onChange && onChange(nextPos, pageSize);
  };
  const onChangeHandler = (e: any) => {
    console.log(e.target);

    const index = Number(e?.target?.dataset?.index);
    const hasPreMore = e?.target?.dataset?.key === "preMore";
    const hasAfterMore = e?.target?.dataset?.key === "afterMore";
    const hasPre = e?.target?.dataset?.key === "pre";
    const hasNext = e?.target?.dataset?.key === "next";

    if (hasPreMore) {
      onPrev(5);
    } else if (hasPre) {
      current != 1 && onPrev();
    } else if (hasAfterMore) {
      onNext(5);
    } else if (hasNext) {
      current != pageListSize && onNext();
    } else if (index) {
      SetCurrent(index);
      onChange && onChange(index, pageSize);
    }
  };
  return (
    <div className={containerCls} style={style} ref={ref}>
      {showTotal && (
        <div className={`${prefixCls}-total-text`}>{`共 ${total} 条`}</div>
      )}
      <ul className={`${prefixCls}-list`} onClick={onChangeHandler}>
        {renderChild()}
      </ul>
    </div>
  );
}

const Pagination = forwardRef(ComponentRef);
Pagination.displayName = "Pagination";
export default Pagination;
