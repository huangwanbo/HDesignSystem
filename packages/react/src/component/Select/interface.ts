import { ReactNode, CSSProperties } from 'react';
type option = {
    label: ReactNode | string;
    value: string | number;
    disabled?: boolean;
    extra?: any
    onClick?: (e: any) => void;
    valueSelect: string | number;
}
type optGroup = {
    label: ReactNode | string;
    className: string | string[];
    style: CSSProperties;
}
type SelectType = {
    style: CSSProperties;
    className: string | string[];
    defaultValue: string;
    value: string;
    inputValue: string;
    mode: 'multiple' | 'tags';
    options: (string | number | option)[];
    unmountOnExit: boolean;
    popupVisible: boolean;
    trigger: 'click' | 'hover';
    onChange: (value: string, option: option) => void;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    placeholder: string;
    children: ReactNode;
    allowClear: boolean;
    allowCreate: boolean;
}
export { SelectType, optGroup, option }