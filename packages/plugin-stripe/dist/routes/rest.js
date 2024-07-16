import { addDataAndFileToRequest } from '@payloadcms/next/utilities';
import { Forbidden } from 'payload';
import { stripeProxy } from '../utilities/stripeProxy.js';
export const stripeREST = async (args)=>{
    let responseStatus = 200;
    let responseJSON;
    const { pluginConfig, req } = args;
    await addDataAndFileToRequest(req);
    const requestWithData = req;
    const { data: { stripeArgs, stripeMethod }, payload, user } = requestWithData;
    const { stripeSecretKey } = pluginConfig;
    try {
        if (!user) {
            // TODO: make this customizable from the config
            throw new Forbidden(req.t);
        }
        responseJSON = await stripeProxy({
            // @ts-expect-error
            stripeArgs,
            // @ts-expect-error
            stripeMethod,
            stripeSecretKey
        });
        const { status } = responseJSON;
        responseStatus = status;
    } catch (error) {
        const message = `An error has occurred in the Stripe plugin REST handler: '${JSON.stringify(error)}'`;
        payload.logger.error(message);
        responseStatus = 500;
        responseJSON = {
            message
        };
    }
    return Response.json(responseJSON, {
        status: responseStatus
    });
};

//# sourceMappingURL=rest.js.map