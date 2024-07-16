import type { ResolvedClientFeatureMap } from '../../../features/typesClient.js';
import type { ClientEditorConfig } from '../types.js';
/**
 * This function expects client functions to ALREADY be ordered & dependencies checked on the server
 * @param unSanitizedEditorConfig
 */
export declare function loadClientFeatures({ clientFunctions, schemaPath, unSanitizedEditorConfig, }: {
    clientFunctions?: Record<string, any>;
    schemaPath: string;
    unSanitizedEditorConfig: ClientEditorConfig;
}): ResolvedClientFeatureMap;
//# sourceMappingURL=loader.d.ts.map