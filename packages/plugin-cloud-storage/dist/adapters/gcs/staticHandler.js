import path from 'path';
import { getFilePrefix } from '../../utilities/getFilePrefix.js';
export const getHandler = ({ bucket, collection, getStorageClient })=>{
    return async (req, { params: { filename } })=>{
        try {
            const prefix = await getFilePrefix({
                collection,
                filename,
                req
            });
            const file = getStorageClient().bucket(bucket).file(path.posix.join(prefix, filename));
            const [metadata] = await file.getMetadata();
            // Manually create a ReadableStream for the web from a Node.js stream.
            const readableStream = new ReadableStream({
                start (controller) {
                    const nodeStream = file.createReadStream();
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
                headers: new Headers({
                    'Content-Length': String(metadata.size),
                    'Content-Type': metadata.contentType,
                    ETag: metadata.etag
                }),
                status: 200
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