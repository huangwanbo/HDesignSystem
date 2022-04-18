import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import cls from "classNames";
import { SelectType } from "./interface";
import Trigger from "../Trigger";
import Option from "./Option";
import { useMergeValue } from "../../_util/hook";
import { IconUp, IconDown, IconCloseCircleFill } from "@DS/Icon";
import { on, off } from "../../_util/event";
import { option } from "./interface";
const prefixCls = "ds-select";

function ComponentRef(props: Partial<SelectType>, ref: any) {
  const {
    placeholder,
    value: propsValue,
    defaultValue,
    popupVisible: propsPopVisible,
    trigger = "click",
    allowClear = false,
    allowCreate = false,
    options = [],
  } = props;
  const [value, setValue] = useMergeValue(defaultValue, propsValue);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [popVisible, _setVisible] = useMergeValue(false, propsPopVisible);
  const [childrenOpt, _setChildOpt] = useState<option[][]>([]);
  const [stringOpt, _setStringOpt] = useState<(string | number)[]>([]);
  const [hover, setHover] = useState(false);
  const triggerRef = useRef<any>();
  const inputRef = useRef<any>();
  const handleClear = () => {
    setValue("");
    setInputValue("");
  };
  const find = (options: option[][], opt: option[]) => {
    if (!opt) return 0;
    return options.filter((o) => o[0].value == opt[0].value).length > 0;
  };
  const findIndex = (options: option[][], opt: option[]) => {
    let index = 0;
    let l = options.length;
    if (!opt) return l - 1;
    for (let i = 0; i < l; i++) {
      if (options[i][0].value == opt[0].value) {
        index = i;
      }
    }
    return index;
  };

  const baseCheck = (e: {
    value: string | number;
    childrenOpt: option[];
    isLeaf: boolean;
  }) => {
    if (e.childrenOpt && e.isLeaf) {
      const f = find(childrenOpt, e.childrenOpt);
      !f && childrenOpt.push(e.childrenOpt);
      stringOpt.push(e.value);
      const index = findIndex(childrenOpt, e.childrenOpt);
      const newOpt = childrenOpt.slice(0, index + 1);
      const newStringOpt = stringOpt.slice(0, index + 1);
      _setChildOpt(newOpt);
      _setStringOpt(newStringOpt);
    } else if (e.childrenOpt && !e.isLeaf) {
      _setChildOpt([e.childrenOpt]);
      _setStringOpt([e.value]);
    } else {
      stringOpt.push(e.value);
    }
    if (e.childrenOpt) return;
    setValue(stringOpt.join("/"));
    setHover(false);
    setTimeout(() => {
      triggerRef.current?.hide && triggerRef.current?.hide();
    });
  };
  const popupStyle: CSSProperties = {
    maxWidth: "100px",
  };
  const renderPopChild = (options: option[], isLeaf = true) => {
    return (
      <div
        className={cls(`${prefixCls}-popup`, `ds-cascader`)}
        style={popupStyle}
      >
        <div className={`${prefixCls}-popup-inner`}>
          {options.map((child) => {
            return (
              <Option
                key={child.value}
                value={child.value}
                //@ts-ignore
                childrenOpt={child.children}
                onClick={(e: any) => {
                  baseCheck(e);
                  setInputValue(e);
                }}
                isLeaf={isLeaf}
              >
                {child.value}
              </Option>
            );
          })}
        </div>
      </div>
    );
  };
  const inputHandleBlur = () => {
    if (!allowCreate) return;
    setValue(value);
  };
  const inputHandleFocus = () => {
    if (!allowCreate) return;
    setValue("");
  };
  const renderChild = (
    <div className={`${prefixCls}-view`}>
      <input
        value={value || ""}
        ref={inputRef}
        autoComplete="off"
        placeholder={
          allowCreate ? String(inputValue) || placeholder : placeholder
        }
        className={cls(`${prefixCls}-view-input`, {
          [`${prefixCls}-hidden`]: value,
        })}
        style={{
          width: "100%",
          pointerEvents: allowCreate ? "all" : "none",
        }}
        onFocus={inputHandleFocus}
        onBlur={inputHandleBlur}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (!(e.key == "Enter")) return;
          setInputValue(inputRef.current.value);
        }}
      />
      <span
        className={`${prefixCls}-view-value`}
        style={{ width: value ? "100%" : "0px" }}
        onClick={() => {
          if (!allowCreate) return;
          inputRef.current && inputRef.current.focus();
        }}
      >
        {value}
      </span>
      <div className={`${prefixCls}-suffix`}>
        <div className={`${prefixCls}-arrow-icon`}>
          {value && allowClear && hover ? (
            <IconCloseCircleFill onClick={handleClear} />
          ) : popVisible ? (
            <IconUp />
          ) : (
            <IconDown />
          )}
        </div>
      </div>
    </div>
  );
  const cs = cls(
    `${prefixCls}`,
    `${prefixCls}-single`,
    `${prefixCls}-size-default`,
    {
      [`${prefixCls}-focused`]: popVisible,
    }
  );

  const handleHide = () => {
    _setVisible(false);
  };
  const handleShow = () => {
    _setVisible(true);
  };

  useEffect(() => {
    const handlehide = (e: any) => {
      e.stopPropagation();
      triggerRef.current.hide();
    };
    on(document.body, "click", handlehide);
    return () => {
      off(document.body, "click", handlehide);
    };
  }, []);
  const handleHover = () => {
    let timmer: NodeJS.Timeout | null;
    return {
      onMouseEnter: () => {
        if (timmer) clearTimeout(timmer);
        setHover(true);
      },
      onMouseLeave: () => {
        if (timmer) clearTimeout(timmer);
        timmer = setTimeout(() => {
          setHover(false);
        }, 100);
      },
    };
  };
  return (
    <div ref={ref} className={cs} {...handleHover()}>
      <Trigger
        popupChildren={
          <>
            {renderPopChild(options, false)}
            {childrenOpt.map((childOpt) => {
              return renderPopChild(childOpt);
            })}
          </>
        }
        wrapStyle={{
          display: "flex",
        }}
        autoAlignPopupWidth
        type={trigger}
        ref={triggerRef}
        show={handleShow}
        hide={handleHide}
      >
        {renderChild}
      </Trigger>
    </div>
  );
}

const Component = forwardRef(ComponentRef);
const Cascader = Component as typeof Component & {
  Option: typeof Option;
};
Cascader.Option = Option;
Cascader.displayName = "Cascader";
export default Cascader;
