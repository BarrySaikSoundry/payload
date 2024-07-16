import React from 'react';
import { StepNavProvider, useStepNav } from './context.js';
import './index.scss';
export { SetStepNav } from './SetStepNav.js';
import type { StepNavItem } from './types.js';
declare const StepNav: React.FC<{
    Link?: React.ComponentType;
    className?: string;
}>;
export { StepNav, StepNavItem, StepNavProvider, useStepNav };
//# sourceMappingURL=index.d.ts.map