import React from 'react';
interface VirtualListProps {
    preHeight?: number;
    extraRenderCount?: number;
    components: React.ReactElement[] | string[];
}
export declare const VirtualList: React.ForwardRefExoticComponent<VirtualListProps & React.RefAttributes<HTMLDivElement>>;
export {};
