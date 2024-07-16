import path from 'path';
import { getFilePrefix } from '../../utilities/getFilePrefix.js';
// Convert a stream into a promise that resolves with a Buffer
const streamToBuffer = async (readableStream)=>{
    const chunks = [];
    for await (const chunk of readableStream){
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
};
export const getHandler = ({ bucket, collection, getStorageClient })=>{
    return async (req, { params: { filename } })=>{
        try {
            const prefix = await getFilePrefix({
                collection,
                filename,
                req
            });
            const object = await getStorageClient().getObject({
                Bucket: bucket,
                Key: path.posix.join(prefix, filename)
            });
            if (!object.Body) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            const bodyBuffer = await streamToBuffer(object.Body);
            return new Response(bodyBuffer, {
                headers: new Headers({
                    'Accept-Ranges': object.AcceptRanges,
                    'Content-Length': String(object.ContentLength),
                    'Content-Type': object.ContentType,
                    ETag: object.ETag
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