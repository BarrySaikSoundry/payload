import { traverseFields } from '@payloadcms/ui/utilities/buildFieldSchemaMap/traverseFields';
export const getGenerateSchemaMap = (args)=>({ config, i18n, schemaMap, schemaPath })=>{
        for (const [featureKey, resolvedFeature] of args.resolvedFeatureMap.entries()){
            if (!('generateSchemaMap' in resolvedFeature) || typeof resolvedFeature.generateSchemaMap !== 'function') {
                continue;
            }
            const schemas = resolvedFeature.generateSchemaMap({
                config,
                i18n,
                props: resolvedFeature.sanitizedServerFeatureProps,
                schemaMap,
                schemaPath
            });
            if (schemas) {
                for (const [schemaKey, fields] of schemas.entries()){
                    // generate schema map entries for sub-fields using traverseFields
                    traverseFields({
                        config,
                        fields,
                        i18n,
                        schemaMap: schemas,
                        schemaPath: schemaKey
                    });
                    schemaMap.set(`${schemaPath}.lexical_internal_feature.${featureKey}.${schemaKey}`, fields);
                }
            }
        }
        return schemaMap;
    };

//# sourceMappingURL=generateSchemaMap.js.map