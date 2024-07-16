import type { AdminViewProps, EditViewProps, Payload, ServerProps, WithServerSidePropsComponentProps } from 'payload';
import React from 'react';
import type { ComponentMap } from './types.js';
export type WithServerSidePropsPrePopulated = React.FC<Omit<WithServerSidePropsComponentProps, 'serverOnlyProps'>>;
export declare const buildComponentMap: (args: {
    DefaultEditView: React.FC<EditViewProps>;
    DefaultListView: React.FC<AdminViewProps>;
    children: React.ReactNode;
    i18n: ServerProps["i18n"];
    payload: Payload;
    readOnly?: boolean;
}) => {
    componentMap: ComponentMap;
    wrappedChildren: React.ReactNode;
};
//# sourceMappingURL=index.d.ts.map