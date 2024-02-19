import React from 'react';
export type VirtualItemProps = {
    index: number;
    setHeight: (index: number, height: number) => void;
    style?: React.CSSProperties;
    children?: React.ReactElement;
};
declare const _default: React.NamedExoticComponent<VirtualItemProps>;
export default _default;
