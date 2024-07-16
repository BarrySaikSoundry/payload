import { useAddClientFunction, useFieldProps } from '@payloadcms/ui';
export const useSlatePlugin = (key, plugin)=>{
    const { schemaPath } = useFieldProps();
    useAddClientFunction(`slatePlugin.${schemaPath}.${key}`, plugin);
};

//# sourceMappingURL=useSlatePlugin.js.map