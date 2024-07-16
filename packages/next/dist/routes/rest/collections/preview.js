import httpStatus from 'http-status';
import { extractJWT, findByIDOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
import { routeError } from '../routeError.js';
export const preview = async ({ id, collection, req })=>{
    const { searchParams } = req;
    const depth = searchParams.get('depth');
    const result = await findByIDOperation({
        id,
        collection,
        depth: isNumber(depth) ? Number(depth) : undefined,
        draft: searchParams.get('draft') === 'true',
        req
    });
    let previewURL;
    const generatePreviewURL = req.payload.config.collections.find((config)=>config.slug === collection.config.slug)?.admin?.preview;
    const token = extractJWT(req);
    if (typeof generatePreviewURL === 'function') {
        try {
            previewURL = await generatePreviewURL(result, {
                locale: req.locale,
                req,
                token
            });
        } catch (err) {
            return routeError({
                collection,
                config: req.payload.config,
                err,
                req
            });
        }
    }
    return Response.json(previewURL, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=preview.js.map