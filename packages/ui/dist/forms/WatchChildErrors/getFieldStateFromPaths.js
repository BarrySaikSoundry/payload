export const getFieldStateFromPaths = ({ formState, pathSegments })=>{
    const fieldState = {};
    let errorCount = 0;
    Object.entries(formState).forEach(([key])=>{
        const matchingSegment = pathSegments?.some((segment)=>{
            if (segment.endsWith('.')) {
                return key.startsWith(segment);
            }
            return key === segment;
        });
        if (matchingSegment) {
            const pathState = formState[key];
            fieldState[key] = pathState;
            if ('valid' in pathState && !pathState.valid) {
                errorCount += 1;
            }
        }
    });
    return {
        errorCount,
        fieldState
    };
};

//# sourceMappingURL=getFieldStateFromPaths.js.map