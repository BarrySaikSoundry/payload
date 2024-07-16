import { getKeyFromFilename } from './utilities.js';
export const getHandler = ({ utApi })=>{
    return async (req, { doc, params: { collection, filename } })=>{
        try {
            const collectionConfig = req.payload.collections[collection]?.config;
            let retrievedDoc = doc;
            if (!retrievedDoc) {
                const or = [
                    {
                        filename: {
                            equals: filename
                        }
                    }
                ];
                if (collectionConfig.upload.imageSizes) {
                    collectionConfig.upload.imageSizes.forEach(({ name })=>{
                        or.push({
                            [`sizes.${name}.filename`]: {
                                equals: filename
                            }
                        });
                    });
                }
                const result = await req.payload.db.findOne({
                    collection,
                    req,
                    where: {
                        or
                    }
                });
                if (result) retrievedDoc = result;
            }
            if (!retrievedDoc) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            const key = getKeyFromFilename(retrievedDoc, filename);
            if (!key) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            const { url: signedURL } = await utApi.getSignedURL(key);
            if (!signedURL) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            const response = await fetch(signedURL);
            if (!response.ok) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            const blob = await response.blob();
            return new Response(blob, {
                headers: new Headers({
                    'Content-Length': String(blob.size),
                    'Content-Type': blob.type
                }),
                status: 200
            });
        } catch (err) {
            req.payload.logger.error({
                err,
                msg: 'Unexpected error in staticHandler'
            });
            return new Response('Internal Server Error', {
                status: 500
            });
        }
    };
};

//# sourceMappingURL=staticHandler.js.map