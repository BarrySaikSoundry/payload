import type { LexicalCommand } from 'lexical';
import type { PluginComponentWithAnchor } from '../../typesClient.js';
import type { UploadFeaturePropsClient } from '../feature.client.js';
import type { UploadData } from '../nodes/UploadNode.js';
export type InsertUploadPayload = Readonly<Omit<UploadData, 'id'> & Partial<Pick<UploadData, 'id'>>>;
export declare const INSERT_UPLOAD_COMMAND: LexicalCommand<InsertUploadPayload>;
export declare const UploadPlugin: PluginComponentWithAnchor<UploadFeaturePropsClient>;
//# sourceMappingURL=index.d.ts.map