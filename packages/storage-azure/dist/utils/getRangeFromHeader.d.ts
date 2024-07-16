import type { BlockBlobClient } from '@azure/storage-blob';
export declare const getRangeFromHeader: (blockBlobClient: BlockBlobClient, rangeHeader?: string) => Promise<{
    end: number | undefined;
    start: number;
}>;
//# sourceMappingURL=getRangeFromHeader.d.ts.map