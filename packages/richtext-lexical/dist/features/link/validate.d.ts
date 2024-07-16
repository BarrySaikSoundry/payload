import type { Field } from 'payload';
import type { NodeValidation } from '../typesServer.js';
import type { LinkFeatureServerProps } from './feature.server.js';
import type { SerializedAutoLinkNode, SerializedLinkNode } from './nodes/types.js';
export declare const linkValidation: (props: LinkFeatureServerProps, sanitizedFieldsWithoutText: Field[]) => NodeValidation<SerializedAutoLinkNode | SerializedLinkNode>;
//# sourceMappingURL=validate.d.ts.map