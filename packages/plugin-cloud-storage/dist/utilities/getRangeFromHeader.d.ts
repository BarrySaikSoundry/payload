import type { BlockBlobClient } from '@azure/storage-blob';
declare const getRangeFromHeader: (blockBlobClient: BlockBlobClient, rangeHeader?: string) => Promise<{
    end: number | undefined;
    start: number;
}>;
export default getRangeFromHeader;
//# sourceMappingURL=getRangeFromHeader.d.ts.map