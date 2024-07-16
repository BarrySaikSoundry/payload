import type { FormState, SanitizedConfig } from 'payload';
import type { BuildFormStateArgs } from '../forms/buildStateFromSchema/index.js';
export declare const getFormState: (args: {
    apiRoute: SanitizedConfig["routes"]["api"];
    body: BuildFormStateArgs;
    onError?: (data?: any) => Promise<void> | void;
    serverURL: SanitizedConfig["serverURL"];
    signal?: AbortSignal;
    token?: string;
}) => Promise<FormState>;
//# sourceMappingURL=getFormState.d.ts.map