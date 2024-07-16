import { traverseFields } from './traverseFields.js';
export const buildFieldSchemaMap = (args)=>{
    const { config, i18n } = args;
    const result = new Map();
    config.collections.forEach((collection)=>{
        traverseFields({
            config,
            fields: collection.fields,
            i18n,
            schemaMap: result,
            schemaPath: collection.slug
        });
    });
    config.globals.forEach((global)=>{
        traverseFields({
            config,
            fields: global.fields,
            i18n,
            schemaMap: result,
            schemaPath: global.slug
        });
    });
    return result;
};

//# sourceMappingURL=index.js.map