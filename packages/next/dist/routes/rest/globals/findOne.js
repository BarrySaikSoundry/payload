import httpStatus from 'http-status';
import { findOneOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const findOne = async ({ globalConfig, req })=>{
    const { searchParams } = req;
    const depth = searchParams.get('depth');
    const result = await findOneOperation({
        slug: globalConfig.slug,
        depth: isNumber(depth) ? Number(depth) : undefined,
        draft: searchParams.get('draft') === 'true',
        globalConfig,
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

//# sourceMappingURL=findOne.js.map