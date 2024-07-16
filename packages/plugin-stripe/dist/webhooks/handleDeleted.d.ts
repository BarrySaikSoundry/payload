import type { SanitizedStripePluginConfig, StripeWebhookHandler } from '../types.js';
type HandleDeleted = (args: {
    resourceType: string;
    syncConfig: SanitizedStripePluginConfig['sync'][0];
} & Parameters<StripeWebhookHandler>[0]) => void;
export declare const handleDeleted: HandleDeleted;
export {};
//# sourceMappingURL=handleDeleted.d.ts.map