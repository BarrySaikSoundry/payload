import httpStatus from 'http-status';
export const endpointsAreDisabled = ({ endpoints, request })=>{
    if (!endpoints) {
        return Response.json({
            message: `Cannot ${request.method.toUpperCase()} ${request.url}`
        }, {
            status: httpStatus.NOT_IMPLEMENTED
        });
    }
};

//# sourceMappingURL=checkEndpoints.js.map