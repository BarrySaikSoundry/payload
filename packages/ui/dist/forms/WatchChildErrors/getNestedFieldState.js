// import { buildPathSegments } from './buildPathSegments'
import { getFieldStateFromPaths } from './getFieldStateFromPaths.js';
export const getNestedFieldState = ({ fieldSchema, formState, // path,
pathSegments: pathSegmentsFromProps })=>{
    const pathSegments = pathSegmentsFromProps;
    if (!pathSegments && fieldSchema) {
    // pathSegments = buildPathSegments(path, fieldSchema)
    }
    const result = getFieldStateFromPaths({
        formState,
        pathSegments
    });
    return {
        ...result,
        pathSegments
    };
};

//# sourceMappingURL=getNestedFieldState.js.map