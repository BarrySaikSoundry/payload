import type { fieldSchemaToJSON } from 'payload/shared';
import type { UpdatedDocument } from './types.js';
export declare const mergeData: <T>(args: {
    apiRoute?: string;
    collectionPopulationRequestHandler?: ({ apiPath, endpoint, serverURL, }: {
        apiPath: string;
        endpoint: string;
        serverURL: string;
    }) => Promise<Response>;
    depth?: number;
    externallyUpdatedRelationship?: UpdatedDocument;
    fieldSchema: ReturnType<typeof fieldSchemaToJSON>;
    incomingData: Partial<T>;
    initialData: T;
    returnNumberOfRequests?: boolean;
    serverURL: string;
}) => Promise<{
    _numberOfRequests?: number;
} & T>;
//# sourceMappingURL=mergeData.d.ts.map