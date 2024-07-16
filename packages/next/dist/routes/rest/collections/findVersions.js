import httpStatus from 'http-status';
import { findVersionsOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const findVersions = async ({ collection, req })=>{
    const { depth, limit, page, sort, where } = req.query;
    const result = await findVersionsOperation({
        collection,
        depth: isNumber(depth) ? Number(depth) : undefined,
        limit: isNumber(limit) ? Number(limit) : undefined,
        page: isNumber(page) ? Number(page) : undefined,
        req,
        sort,
        where
    });
    return Response.json(result, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=findVersions.js.map