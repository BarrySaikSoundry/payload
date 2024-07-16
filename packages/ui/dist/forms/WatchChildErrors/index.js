'use client';
import { useThrottledEffect } from '../../hooks/useThrottledEffect.js';
import { useAllFormFields, useFormSubmitted } from '../Form/context.js';
import { buildPathSegments } from './buildPathSegments.js';
import { getFieldStateFromPaths } from './getFieldStateFromPaths.js';
export const WatchChildErrors = ({ fieldMap, path, setErrorCount })=>{
    const [formState] = useAllFormFields();
    const hasSubmitted = useFormSubmitted();
    const pathSegments = buildPathSegments(path, fieldMap);
    useThrottledEffect(()=>{
        if (hasSubmitted) {
            const { errorCount } = getFieldStateFromPaths({
                formState,
                pathSegments
            });
            setErrorCount(errorCount);
        }
    }, 250, [
        formState,
        hasSubmitted,
        fieldMap
    ]);
    return null;
};

//# sourceMappingURL=index.js.map