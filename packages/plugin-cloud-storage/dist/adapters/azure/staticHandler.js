import path from 'path';
import { getFilePrefix } from '../../utilities/getFilePrefix.js';
import getRangeFromHeader from '../../utilities/getRangeFromHeader.js';
export const getHandler = ({ collection, getStorageClient })=>{
    return async (req, { params: { filename } })=>{
        try {
            const prefix = await getFilePrefix({
                collection,
                filename,
                req
            });
            const blockBlobClient = getStorageClient().getBlockBlobClient(path.posix.join(prefix, filename));
            const { end, start } = await getRangeFromHeader(blockBlobClient, req.headers.get('range'));
            const blob = await blockBlobClient.download(start, end);
            const response = blob._response;
            // Manually create a ReadableStream for the web from a Node.js stream.
            const readableStream = new ReadableStream({
                start (controller) {
                    const nodeStream = blob.readableStreamBody;
                    nodeStream.on('data', (chunk)=>{
                        controller.enqueue(new Uint8Array(chunk));
                    });
                    nodeStream.on('end', ()=>{
                        controller.close();
                    });
                    nodeStream.on('error', (err)=>{
                        controller.error(err);
                    });
                }
            });
            return new Response(readableStream, {
                headers: response.headers.rawHeaders(),
                status: response.status
            });
        } catch (err) {
            req.payload.logger.error(err);
            return new Response('Internal Server Error', {
                status: 500
            });
        }
    };
};

//# sourceMappingURL=staticHandler.js.map