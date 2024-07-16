import type { FormState } from 'payload';
/**
 * Merges certain properties from the server state into the client state. These do not include values,
 * as we do not want to update them on the client like that, which would cause flickering.
 *
 * We want to use this to update the error state, and other properties that are not user input, as the error state
 * is the thing we want to keep in sync with the server (where it's calculated) on the client.
 */
export declare const mergeServerFormState: (existingState: FormState, incomingState: FormState) => {
    changed: boolean;
    newState: FormState;
};
//# sourceMappingURL=mergeServerFormState.d.ts.map