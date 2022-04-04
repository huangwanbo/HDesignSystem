import React, { forwardRef, useRef, ReactNode } from "react";
import BaseInput, { BaseInputType } from "./BaseInput";
import Button from "../Button";
import { omit } from "lodash";
import { IconSearch, IconLoading } from "@DS/Icon";
import cls from "classNames";
const prefixCls = "ds-input";

type InputType = {
  loading: boolean;
  onSearch: (value: string) => void;
  searchButton: boolean | ReactNode;
} & BaseInputType;

function ComponentRef(props: Partial<InputType>, ref: any) {
  const inputRef = ref || useRef<BaseInputType>();
  const { loading, onSearch, searchButton } = props;
  const handleSearch = () => {
    if (loading) return;
    const value = inputRef.current.dom.value;
    onSearch && onSearch(value);
  };
  const suffix = !searchButton ? (
    loading ? (
      <IconLoading />
    ) : (
      <IconSearch onClick={handleSearch} />
    )
  ) : null;
  const searchType =
    typeof searchButton === "boolean" ? "boolean" : "reactNode";
  const AfterDOM = (
    <span className={cls(`${prefixCls}-group-addafter`)}>
      <Button type="primary" onClick={handleSearch} disabled={loading}>
        {loading ? (
          <>
            <IconLoading />
            {searchType === "boolean" ? null : (
              <span style={{ marginLeft: "4px" }}>{searchButton}</span>
            )}
          </>
        ) : searchType === "boolean" ? (
          <IconSearch />
        ) : (
          searchButton
        )}
      </Button>
    </span>
  );
  const cs = cls(`${prefixCls}-search`, `${prefixCls}-group`, {
    [`${prefixCls}-search-loading`]: loading,
  });
  const cs_wrap = cls(`${prefixCls}-group-wrapper`);
  return (
    <div className={cs_wrap} style={props.style}>
      <span className={cs}>
        <BaseInput
          {...omit(props, ["loading", "onSearch", "searchButton", "style"])}
          ref={inputRef}
          suffix={suffix}
          type={"text"}
        />
        {searchButton && AfterDOM}
      </span>
    </div>
  );
}

const Search = forwardRef(ComponentRef);
Search.displayName = "Search";
export default Search;
