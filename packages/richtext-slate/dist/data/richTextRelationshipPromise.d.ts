import type { PayloadRequest, RichTextAdapter, RichTextField } from 'payload';
import type { AdapterArguments } from '../types.js';
export type Args = Parameters<RichTextAdapter<any[], AdapterArguments>['graphQLPopulationPromises']>[0];
type RecurseRichTextArgs = {
    children: unknown[];
    currentDepth: number;
    depth: number;
    draft: boolean;
    field: RichTextField<any[], AdapterArguments, AdapterArguments>;
    overrideAccess: boolean;
    populationPromises: Promise<void>[];
    req: PayloadRequest;
    showHiddenFields: boolean;
};
export declare const recurseRichText: ({ children, currentDepth, depth, draft, field, overrideAccess, populationPromises, req, showHiddenFields, }: RecurseRichTextArgs) => void;
export declare const richTextRelationshipPromise: ({ currentDepth, depth, draft, field, overrideAccess, populationPromises, req, showHiddenFields, siblingDoc, }: Args) => void;
export {};
//# sourceMappingURL=richTextRelationshipPromise.d.ts.map