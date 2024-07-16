import type { TFunction } from '@payloadcms/translations';
import type { ClientCollectionConfig } from '../collections/config/client.js';
import type { ClientGlobalConfig } from '../globals/config/client.js';
import type { LivePreviewConfig, SanitizedConfig, ServerOnlyLivePreviewProperties } from './types.js';
export type ServerOnlyRootProperties = keyof Pick<SanitizedConfig, 'bin' | 'cors' | 'csrf' | 'custom' | 'db' | 'editor' | 'email' | 'endpoints' | 'graphQL' | 'hooks' | 'onInit' | 'plugins' | 'secret' | 'sharp' | 'typescript'>;
export type ServerOnlyRootAdminProperties = keyof Pick<SanitizedConfig['admin'], 'components'>;
export type ClientConfig = {
    admin: {
        livePreview?: Omit<LivePreviewConfig, ServerOnlyLivePreviewProperties>;
    } & Omit<SanitizedConfig['admin'], 'livePreview' & ServerOnlyRootAdminProperties>;
    collections: ClientCollectionConfig[];
    custom?: Record<string, any>;
    globals: ClientGlobalConfig[];
} & Omit<SanitizedConfig, 'admin' | 'collections' | 'globals' | ServerOnlyRootProperties>;
export declare const createClientConfig: ({ config, t, }: {
    config: SanitizedConfig;
    t: TFunction;
}) => Promise<ClientConfig>;
//# sourceMappingURL=client.d.ts.map