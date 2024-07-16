import { BlobServiceClient } from '@azure/storage-blob';
let storageClient = null;
export function getStorageClient(options) {
    if (storageClient) return storageClient;
    const { connectionString, containerName } = options;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    storageClient = blobServiceClient.getContainerClient(containerName);
    return storageClient;
}

//# sourceMappingURL=getStorageClient.js.map