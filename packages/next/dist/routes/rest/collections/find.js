import httpStatus from 'http-status';
import { findOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const find = async ({ collection, req })=>{
    const { depth, draft, limit, page, sort, where } = req.query;
    const result = await findOperation({
        collection,
        depth: isNumber(depth) ? Number(depth) : undefined,
        draft: draft === 'true',
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

//# sourceMappingURL=find.js.map