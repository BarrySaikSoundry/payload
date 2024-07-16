import { buildStateFromSchema } from '@payloadcms/ui/forms/buildStateFromSchema';
export const linkValidation = (props, sanitizedFieldsWithoutText)=>{
    return async ({ node, validation: { options: { id, operation, preferences, req } } })=>{
        /**
     * Run buildStateFromSchema as that properly validates link fields and link sub-fields
     */ const result = await buildStateFromSchema({
            id,
            data: node.fields,
            fieldSchema: sanitizedFieldsWithoutText,
            operation: operation === 'create' || operation === 'update' ? operation : 'update',
            preferences,
            req,
            siblingData: node.fields
        });
        let errorPaths = [];
        for(const fieldKey in result){
            if (result[fieldKey].errorPaths) {
                errorPaths = errorPaths.concat(result[fieldKey].errorPaths);
            }
        }
        if (errorPaths.length) {
            return 'The following fields are invalid: ' + errorPaths.join(', ');
        }
        return true;
    };
};

//# sourceMappingURL=validate.js.map