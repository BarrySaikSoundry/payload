import type { FeatureProviderProviderClient } from './typesClient.js';
import type { ServerFeature } from './typesServer.js';
/**
 * Utility function to create a client component for the client feature
 */
export declare const createClientComponent: <ClientFeatureProps>(clientFeature: FeatureProviderProviderClient<ClientFeatureProps>) => ServerFeature<unknown, ClientFeatureProps>["ClientFeature"];
//# sourceMappingURL=createClientComponent.d.ts.map