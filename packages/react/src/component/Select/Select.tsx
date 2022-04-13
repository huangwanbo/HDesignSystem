import React, {
  forwardRef,
  isValidElement,
  useRef,
  useEffect,
  useState,
} from "react";
import cls from "classNames";
import { SelectType } from "./interface";
import Trigger from "../Trigger";
import Option from "./Option";
import { useMergeValue } from "../../_util/hook";
import { IconUp, IconDown, IconCloseCircleFill } from "@DS/Icon";
import { on, off } from "../../_util/event";
const prefixCls = "ds-select";

function ComponentRef(props: Partial<SelectType>, ref: any) {
  const {
    placeholder,
    value: propsValue,
    defaultValue,
    popupVisible: propsPopVisible,
    trigger = "hover",
    allowClear = false,
    allowCreate = false,
  } = props;
  const [value, setValue] = useMergeValue(defaultValue, propsValue);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [popVisible, _setVisible] = useMergeValue(false, propsPopVisible);
  const [hover, setHover] = useState(false);
  const triggerRef = useRef<any>();
  const inputRef = useRef<any>();
  const handleClear = () => {
    setValue("");
    setInputValue("");
  };
  const baseCheck = (e: string | number) => {
    setValue(e);
    setHover(false);
    setTimeout(() => {
      triggerRef.current?.hide && triggerRef.current?.hide();
    });
  };
  const renderPopChild = (
    <div className={`${prefixCls}-popup`}>
      <div className={`${prefixCls}-popup-inner`}>
        {allowCreate && value && (
          <Option
            key={"search"}
            value={value}
            onClick={(e: string | number) => {
              baseCheck(e);
              setInputValue(e);
            }}
          >
            {value}
          </Option>
        )}
        {React.Children.map(props.children, (child) => {
          if (!isValidElement(child)) return child;
          if (!child.props.value.includes(value)) return null;
          return React.cloneElement(child, {
            ...child.props,
            onClick: (e: string | number) => {
              child.props?.onClick && child.props?.onClick(e);
              baseCheck(e);
            },
            valueSelect: value,
          });
        })}
      </div>
    </div>
  );
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
        popupChildren={renderPopChild}
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
const Select = Component as typeof Component & {
  Option: typeof Option;
};
Select.Option = Option;
Select.displayName = "Select";
export default Select;
