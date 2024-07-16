import httpStatus from 'http-status';
import { deleteByIDOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
import { sanitizeCollectionID } from '../utilities/sanitizeCollectionID.js';
export const deleteByID = async ({ id: incomingID, collection, req })=>{
    const { searchParams } = req;
    const depth = searchParams.get('depth');
    const id = sanitizeCollectionID({
        id: incomingID,
        collectionSlug: collection.config.slug,
        payload: req.payload
    });
    const doc = await deleteByIDOperation({
        id,
        collection,
        depth: isNumber(depth) ? depth : undefined,
        req
    });
    const headers = headersWithCors({
        headers: new Headers(),
        req
    });
    if (!doc) {
        return Response.json({
            message: req.t('general:notFound')
        }, {
            headers,
            status: httpStatus.NOT_FOUND
        });
    }
    return Response.json({
        doc,
        message: req.t('general:deletedSuccessfully')
    }, {
        headers,
        status: httpStatus.OK
    });
};

//# sourceMappingURL=deleteByID.js.map