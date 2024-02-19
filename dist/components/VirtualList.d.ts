import React from 'react';
export interface VirtualListProps {
    preHeight?: number;
    extraRenderCount?: number;
    components: React.ReactElement[];
    wideSkeleton?: boolean;
}
export declare const VirtualList: React.ForwardRefExoticComponent<VirtualListProps & React.RefAttributes<HTMLDivElement>>;
