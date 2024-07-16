import type { groupNavItems } from '@payloadcms/ui/shared';
import type { Permissions, ServerProps, VisibleEntities } from 'payload';
import React from 'react';
import './index.scss';
export type DashboardProps = {
    Link: React.ComponentType<any>;
    navGroups?: ReturnType<typeof groupNavItems>;
    permissions: Permissions;
    visibleEntities: VisibleEntities;
} & ServerProps;
export declare const DefaultDashboard: React.FC<DashboardProps>;
//# sourceMappingURL=index.d.ts.map