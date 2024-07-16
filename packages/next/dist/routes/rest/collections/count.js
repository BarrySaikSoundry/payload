import httpStatus from 'http-status';
import { countOperation } from 'payload';
export const count = async ({ collection, req })=>{
    const { where } = req.query;
    const result = await countOperation({
        collection,
        req,
        where
    });
    return Response.json(result, {
        status: httpStatus.OK
    });
};

//# sourceMappingURL=count.js.map