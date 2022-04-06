import React from "react";
import { difference } from "lodash";
export type resultType<T> = {
  selected: T[];
  setSelected: (value: T[]) => void;
  setValueSelected: (value: T | T[], selected?: boolean) => void;
  selectAll: () => void;
  unSelectAll: () => void;
  isSelected: (value: T) => boolean;
  toggle: (value?: T | T[]) => void;
  isAllSelected: () => boolean;
  isPartialSelected: () => boolean;
};
function useCheckbox<T>(values: T[], defaultValues?: T[]): resultType<T> {
  const [selected, setSelected] = React.useState(defaultValues || []);
  const { setValueSelected, isSelected } = React.useMemo(() => {
    const setValueSelected = (value: T | T[]) => {
      if (Array.isArray(value)) {
        const currentValue = [...selected];
        value.forEach((v) => {
          if (!selected.includes(v) && values.includes(v)) {
            currentValue.push(v);
          }
        });
        setSelected(currentValue);
      } else {
        if (!selected.includes(value) && values.includes(value)) {
          const currentValue = [...selected];
          currentValue.push(value);
          setSelected(currentValue);
        }
      }
    };
    const isSelected = (value: T) => {
      return selected.includes(value);
    };

    return {
      setValueSelected,
      isSelected,
    };
  }, [selected]);

  const { selectAll, unSelectAll, toggle, isAllSelected, isPartialSelected } =
    React.useMemo(() => {
      const selectAll = () => {
        setSelected(values);
      };
      const unSelectAll = () => {
        setSelected([]);
      };
      const toggle = (value?: T | T[]) => {
        if (!value) {
          const toggleVal = difference(values, selected);
          setSelected(toggleVal);
        } else {
          if (Array.isArray(value)) {
            let toggleVal = selected;
            value.forEach((v) => {
              if (selected.includes(v)) {
                toggleVal = difference(toggleVal, [v]);
              } else {
                toggleVal.push(v);
              }
            });
            setSelected(toggleVal);
          } else {
            let toggleVal = selected;
            if (selected.includes(value)) {
              toggleVal = difference(toggleVal, [value]);
            } else {
              toggleVal.push(value);
            }
            setSelected(toggleVal);
          }
        }
      };
      const baseDifference = () => {
        return difference(values, selected);
      };
      const isAllSelected = () => {
        return baseDifference().length === 0;
      };
      const isPartialSelected = () => {
        return baseDifference().length > 0;
      };
      return {
        selectAll,
        unSelectAll,
        isSelected,
        toggle,
        isAllSelected,
        isPartialSelected,
      };
    }, [selected, values, isSelected]);

  return {
    selected,
    setSelected,
    setValueSelected,
    selectAll,
    unSelectAll,
    isSelected,
    toggle,
    isAllSelected,
    isPartialSelected,
  };
}
export default useCheckbox;
