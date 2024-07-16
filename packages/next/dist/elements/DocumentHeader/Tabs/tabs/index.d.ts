import type { DocumentTabConfig } from 'payload';
export declare const documentViewKeys: string[];
export type DocumentViewKey = (typeof documentViewKeys)[number];
export declare const tabs: Record<DocumentViewKey, {
    order?: number;
} & DocumentTabConfig>;
//# sourceMappingURL=index.d.ts.map