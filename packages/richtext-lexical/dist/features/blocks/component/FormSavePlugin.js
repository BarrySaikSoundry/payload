import { useAllFormFields } from '@payloadcms/ui';
import { reduceFieldsToValues } from 'payload/shared';
import { useEffect } from 'react';
import { removeEmptyArrayValues } from './removeEmptyArrayValues.js';
export const FormSavePlugin = (props)=>{
    const { onChange } = props;
    const [_fields] = useAllFormFields();
    const fields = removeEmptyArrayValues({
        fields: _fields
    });
    // Pass in fields, and indicate if you'd like to "unflatten" field data.
    // The result below will reflect the data stored in the form at the given time
    const newFormData = reduceFieldsToValues(fields, true);
    useEffect(()=>{
        if (onChange) {
            onChange({
                fullFieldsWithValues: fields,
                newFormData
            });
        }
    }, [
        newFormData,
        onChange,
        fields
    ]);
    return null;
};

//# sourceMappingURL=FormSavePlugin.js.map