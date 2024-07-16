import type React from 'react';
import type { ClientComponentProps, ClientFeature, ClientFeatureProviderMap, ResolvedClientFeatureMap } from '../features/typesClient.js';
import type { ClientEditorConfig } from '../lexical/config/types.js';
export type CreateClientFeatureArgs<UnSanitizedClientProps, ClientProps> = ((props: {
    clientFunctions: Record<string, any>;
    /** unSanitizedEditorConfig.features, but mapped */
    featureProviderMap: ClientFeatureProviderMap;
    props: ClientComponentProps<UnSanitizedClientProps>;
    resolvedFeatures: ResolvedClientFeatureMap;
    unSanitizedEditorConfig: ClientEditorConfig;
}) => ClientFeature<ClientProps>) | Omit<ClientFeature<ClientProps>, 'sanitizedClientFeatureProps'>;
export declare const createClientFeature: <UnSanitizedClientProps = undefined, ClientProps = UnSanitizedClientProps>(args: CreateClientFeatureArgs<UnSanitizedClientProps, ClientProps>) => React.FC<ClientComponentProps<ClientProps>>;
//# sourceMappingURL=createClientFeature.d.ts.map