import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { flattenTopLevelFields, toWords } from 'payload';
import { fieldAffectsData, optionIsObject, tabHasName } from 'payload/shared';
import { GraphQLJSON } from '../packages/graphql-type-json/index.js';
import combineParentName from '../utilities/combineParentName.js';
import formatName from '../utilities/formatName.js';
import { groupOrTabHasRequiredSubfield } from '../utilities/groupOrTabHasRequiredSubfield.js';
import withNullableType from './withNullableType.js';
const idFieldTypes = {
    number: GraphQLInt,
    text: GraphQLString
};
export const getCollectionIDType = (type, collection)=>{
    const idField = flattenTopLevelFields(collection.fields).find((field)=>fieldAffectsData(field) && field.name === 'id');
    if (!idField) {
        return idFieldTypes[type];
    }
    return idFieldTypes[idField.type];
};
export function buildMutationInputType({ name, config, fields, forceNullable = false, graphqlResult, parentName }) {
    const fieldToSchemaMap = {
        array: (inputObjectTypeConfig, field)=>{
            const fullName = combineParentName(parentName, toWords(field.name, true));
            let type = buildMutationInputType({
                name: fullName,
                config,
                fields: field.fields,
                graphqlResult,
                parentName: fullName
            });
            if (!type) return inputObjectTypeConfig;
            type = new GraphQLList(withNullableType(field, type, forceNullable));
            return {
                ...inputObjectTypeConfig,
                [field.name]: {
                    type
                }
            };
        },
        blocks: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: GraphQLJSON
                }
            }),
        checkbox: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: GraphQLBoolean
                }
            }),
        code: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            }),
        collapsible: (inputObjectTypeConfig, field)=>field.fields.reduce((acc, subField)=>{
                const addSubField = fieldToSchemaMap[subField.type];
                if (addSubField) return addSubField(acc, subField);
                return acc;
            }, inputObjectTypeConfig),
        date: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            }),
        email: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            }),
        group: (inputObjectTypeConfig, field)=>{
            const requiresAtLeastOneField = groupOrTabHasRequiredSubfield(field);
            const fullName = combineParentName(parentName, toWords(field.name, true));
            let type = buildMutationInputType({
                name: fullName,
                config,
                fields: field.fields,
                graphqlResult,
                parentName: fullName
            });
            if (!type) return inputObjectTypeConfig;
            if (requiresAtLeastOneField) type = new GraphQLNonNull(type);
            return {
                ...inputObjectTypeConfig,
                [field.name]: {
                    type
                }
            };
        },
        json: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLJSON, forceNullable)
                }
            }),
        number: (inputObjectTypeConfig, field)=>{
            const type = field.name === 'id' ? GraphQLInt : GraphQLFloat;
            return {
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, field.hasMany === true ? new GraphQLList(type) : type, forceNullable)
                }
            };
        },
        point: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, new GraphQLList(GraphQLFloat), forceNullable)
                }
            }),
        radio: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            }),
        relationship: (inputObjectTypeConfig, field)=>{
            const { relationTo } = field;
            let type;
            if (Array.isArray(relationTo)) {
                const fullName = `${combineParentName(parentName, toWords(field.name, true))}RelationshipInput`;
                type = new GraphQLInputObjectType({
                    name: fullName,
                    fields: {
                        relationTo: {
                            type: new GraphQLEnumType({
                                name: `${fullName}RelationTo`,
                                values: relationTo.reduce((values, option)=>({
                                        ...values,
                                        [formatName(option)]: {
                                            value: option
                                        }
                                    }), {})
                            })
                        },
                        value: {
                            type: GraphQLJSON
                        }
                    }
                });
            } else {
                type = getCollectionIDType(config.db.defaultIDType, graphqlResult.collections[relationTo].config);
            }
            return {
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: field.hasMany ? new GraphQLList(type) : type
                }
            };
        },
        richText: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLJSON, forceNullable)
                }
            }),
        row: (inputObjectTypeConfig, field)=>field.fields.reduce((acc, subField)=>{
                const addSubField = fieldToSchemaMap[subField.type];
                if (addSubField) return addSubField(acc, subField);
                return acc;
            }, inputObjectTypeConfig),
        select: (inputObjectTypeConfig, field)=>{
            const formattedName = `${combineParentName(parentName, field.name)}_MutationInput`;
            let type = new GraphQLEnumType({
                name: formattedName,
                values: field.options.reduce((values, option)=>{
                    if (optionIsObject(option)) {
                        return {
                            ...values,
                            [formatName(option.value)]: {
                                value: option.value
                            }
                        };
                    }
                    return {
                        ...values,
                        [formatName(option)]: {
                            value: option
                        }
                    };
                }, {})
            });
            type = field.hasMany ? new GraphQLList(type) : type;
            type = withNullableType(field, type, forceNullable);
            return {
                ...inputObjectTypeConfig,
                [field.name]: {
                    type
                }
            };
        },
        tabs: (inputObjectTypeConfig, field)=>{
            return field.tabs.reduce((acc, tab)=>{
                if (tabHasName(tab)) {
                    const fullName = combineParentName(parentName, toWords(tab.name, true));
                    const requiresAtLeastOneField = groupOrTabHasRequiredSubfield(field);
                    let type = buildMutationInputType({
                        name: fullName,
                        config,
                        fields: tab.fields,
                        graphqlResult,
                        parentName: fullName
                    });
                    if (!type) return acc;
                    if (requiresAtLeastOneField) type = new GraphQLNonNull(type);
                    return {
                        ...acc,
                        [tab.name]: {
                            type
                        }
                    };
                }
                return {
                    ...acc,
                    ...tab.fields.reduce((subFieldSchema, subField)=>{
                        const addSubField = fieldToSchemaMap[subField.type];
                        if (addSubField) return addSubField(subFieldSchema, subField);
                        return subFieldSchema;
                    }, acc)
                };
            }, inputObjectTypeConfig);
        },
        text: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, field.hasMany === true ? new GraphQLList(GraphQLString) : GraphQLString, forceNullable)
                }
            }),
        textarea: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            }),
        upload: (inputObjectTypeConfig, field)=>({
                ...inputObjectTypeConfig,
                [field.name]: {
                    type: withNullableType(field, GraphQLString, forceNullable)
                }
            })
    };
    const fieldName = formatName(name);
    const fieldSchemas = fields.reduce((inputObjectTypeConfig, field)=>{
        const fieldSchema = fieldToSchemaMap[field.type];
        if (typeof fieldSchema !== 'function') {
            return inputObjectTypeConfig;
        }
        const schema = fieldSchema(inputObjectTypeConfig, field);
        if (Object.keys(schema).length === 0) {
            return inputObjectTypeConfig;
        }
        return {
            ...inputObjectTypeConfig,
            ...fieldSchema(inputObjectTypeConfig, field)
        };
    }, {});
    if (Object.keys(fieldSchemas).length === 0) {
        return null;
    }
    return new GraphQLInputObjectType({
        name: `mutation${fieldName}Input`,
        fields: fieldSchemas
    });
}

//# sourceMappingURL=buildMutationInputType.js.map