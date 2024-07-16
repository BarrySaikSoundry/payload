import httpStatus from 'http-status';
import { APIError } from 'payload';
import { getPayloadHMR } from '../../utilities/getPayloadHMR.js';
import { headersWithCors } from '../../utilities/headersWithCors.js';
const formatErrors = (incoming)=>{
    if (incoming) {
        // Cannot use `instanceof` to check error type: https://github.com/microsoft/TypeScript/issues/13965
        // Instead, get the prototype of the incoming error and check its constructor name
        const proto = Object.getPrototypeOf(incoming);
        // Payload 'ValidationError' and 'APIError'
        if ((proto.constructor.name === 'ValidationError' || proto.constructor.name === 'APIError') && incoming.data) {
            return {
                errors: [
                    {
                        name: incoming.name,
                        data: incoming.data,
                        message: incoming.message
                    }
                ]
            };
        }
        // Mongoose 'ValidationError': https://mongoosejs.com/docs/api/error.html#Error.ValidationError
        if (proto.constructor.name === 'ValidationError' && 'errors' in incoming && incoming.errors) {
            return {
                errors: Object.keys(incoming.errors).reduce((acc, key)=>{
                    acc.push({
                        field: incoming.errors[key].path,
                        message: incoming.errors[key].message
                    });
                    return acc;
                }, [])
            };
        }
        if (Array.isArray(incoming.message)) {
            return {
                errors: incoming.message
            };
        }
        if (incoming.name) {
            return {
                errors: [
                    {
                        message: incoming.message
                    }
                ]
            };
        }
    }
    return {
        errors: [
            {
                message: 'An unknown error occurred.'
            }
        ]
    };
};
export const routeError = async ({ collection, config: configArg, err, req })=>{
    let payload = req?.payload;
    if (!payload) {
        try {
            payload = await getPayloadHMR({
                config: configArg
            });
        } catch (e) {
            return Response.json({
                message: 'There was an error initializing Payload'
            }, {
                status: httpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
    req.payload = payload;
    const headers = headersWithCors({
        headers: new Headers(),
        req
    });
    const { config, logger } = payload;
    let response = formatErrors(err);
    let status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    logger.error(err.stack);
    // Internal server errors can contain anything, including potentially sensitive data.
    // Therefore, error details will be hidden from the response unless `config.debug` is `true`
    if (!config.debug && status === httpStatus.INTERNAL_SERVER_ERROR) {
        response = formatErrors(new APIError('Something went wrong.'));
    }
    if (config.debug && config.debug === true) {
        response.stack = err.stack;
    }
    if (collection && typeof collection.config.hooks.afterError === 'function') {
        ({ response, status } = collection.config.hooks.afterError(err, response, req?.context, collection.config) || {
            response,
            status
        });
    }
    if (typeof config.hooks.afterError === 'function') {
        ({ response, status } = config.hooks.afterError(err, response, req?.context, collection?.config) || {
            response,
            status
        });
    }
    return Response.json(response, {
        headers,
        status
    });
};

//# sourceMappingURL=routeError.js.map