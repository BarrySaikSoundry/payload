import { initOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const init = async ({ collection, req })=>{
    const initialized = await initOperation({
        collection: collection.config.slug,
        req
    });
    return Response.json({
        initialized
    }, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        })
    });
};

//# sourceMappingURL=init.js.map