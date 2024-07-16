import type { Description, DocumentPermissions } from 'payload';
import React from 'react';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
type Args = {
    AfterFields?: React.ReactNode;
    BeforeFields?: React.ReactNode;
    description?: Description;
    docPermissions: DocumentPermissions;
    fieldMap: FieldMap;
    forceSidebarWrap?: boolean;
    readOnly: boolean;
    schemaPath: string;
};
export declare const DocumentFields: React.FC<Args>;
export {};
//# sourceMappingURL=index.d.ts.map