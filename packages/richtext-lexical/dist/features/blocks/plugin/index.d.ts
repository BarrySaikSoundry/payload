import type { PluginComponent } from '../../typesClient.js';
import type { BlocksFeatureClientProps } from '../feature.client.js';
import type { BlockFields } from '../nodes/BlocksNode.js';
export type InsertBlockPayload = Exclude<BlockFields, 'id'>;
export declare const BlocksPlugin: PluginComponent<BlocksFeatureClientProps>;
//# sourceMappingURL=index.d.ts.map