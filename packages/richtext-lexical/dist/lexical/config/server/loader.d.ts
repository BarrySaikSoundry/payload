import type { SanitizedConfig } from 'payload';
import type { FeatureProviderServer, ResolvedServerFeatureMap } from '../../../features/typesServer.js';
import type { ServerEditorConfig } from '../types.js';
export declare function sortFeaturesForOptimalLoading(featureProviders: FeatureProviderServer<unknown, unknown, unknown>[]): FeatureProviderServer<unknown, unknown, unknown>[];
export declare function loadFeatures({ config, isRoot, unSanitizedEditorConfig, }: {
    config: SanitizedConfig;
    isRoot?: boolean;
    unSanitizedEditorConfig: ServerEditorConfig;
}): Promise<ResolvedServerFeatureMap>;
//# sourceMappingURL=loader.d.ts.map