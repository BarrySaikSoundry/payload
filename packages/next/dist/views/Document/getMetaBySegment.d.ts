import type { Metadata } from 'next';
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
import type { GenerateViewMetadata } from '../Root/index.js';
export type GenerateEditViewMetadata = (args: {
    collectionConfig?: SanitizedCollectionConfig | null;
    globalConfig?: SanitizedGlobalConfig | null;
} & Parameters<GenerateViewMetadata>[0]) => Promise<Metadata>;
export declare const getMetaBySegment: GenerateEditViewMetadata;
//# sourceMappingURL=getMetaBySegment.d.ts.map