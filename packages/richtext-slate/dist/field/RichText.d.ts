import type { FormFieldBase } from '@payloadcms/ui';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import React from 'react';
import type { ElementNode, RichTextPlugin, TextNode } from '../types.js';
import type { EnabledFeatures } from './types.js';
import './index.scss';
declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & HistoryEditor & ReactEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
export declare const RichText: React.FC<{
    elements: EnabledFeatures["elements"];
    leaves: EnabledFeatures["leaves"];
    name: string;
    placeholder?: string;
    plugins: RichTextPlugin[];
    richTextComponentMap: Map<string, React.ReactNode>;
    width?: string;
} & FormFieldBase>;
//# sourceMappingURL=RichText.d.ts.map