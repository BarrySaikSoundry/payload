import * as React from 'react';
import './index.scss';
export type ShimmerEffectProps = {
    animationDelay?: string;
    height?: number | string;
    width?: number | string;
};
export declare const ShimmerEffect: React.FC<ShimmerEffectProps>;
export type StaggeredShimmersProps = {
    className?: string;
    count: number;
    height?: number | string;
    renderDelay?: number;
    shimmerDelay?: number | string;
    shimmerItemClassName?: string;
    width?: number | string;
};
export declare const StaggeredShimmers: React.FC<StaggeredShimmersProps>;
//# sourceMappingURL=index.d.ts.map