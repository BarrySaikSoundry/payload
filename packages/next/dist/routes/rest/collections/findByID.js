import httpStatus from 'http-status';
import { findByIDOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
import { sanitizeCollectionID } from '../utilities/sanitizeCollectionID.js';
export const findByID = async ({ id: incomingID, collection, req })=>{
    const { searchParams } = req;
    const depth = searchParams.get('depth');
    const id = sanitizeCollectionID({
        id: incomingID,
        collectionSlug: collection.config.slug,
        payload: req.payload
    });
    const result = await findByIDOperation({
        id,
        collection,
        depth: isNumber(depth) ? Number(depth) : undefined,
        draft: searchParams.get('draft') === 'true',
        req
    });
    return Response.json(result, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=findByID.js.map