import type { FormFieldBase } from '@payloadcms/ui';
import type { FieldMap, ReducedBlock } from '@payloadcms/ui/utilities/buildComponentMap';
import React from 'react';
import type { SanitizedClientEditorConfig } from '../../../lexical/config/types.js';
import type { BlockFields } from '../nodes/BlocksNode.js';
type Props = {
    baseClass: string;
    field: {
        editorConfig: SanitizedClientEditorConfig;
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    formData: BlockFields;
    formSchema: FieldMap;
    nodeKey: string;
    path: string;
    reducedBlock: ReducedBlock;
    schemaPath: string;
};
/**
 * The actual content of the Block. This should be INSIDE a Form component,
 * scoped to the block. All format operations in here are thus scoped to the block's form, and
 * not the whole document.
 */
export declare const BlockContent: React.FC<Props>;
export {};
//# sourceMappingURL=BlockContent.d.ts.map