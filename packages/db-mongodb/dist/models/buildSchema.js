import mongoose from 'mongoose';
import { fieldAffectsData, fieldIsLocalized, fieldIsPresentationalOnly, tabHasName } from 'payload/shared';
const formatBaseSchema = (field, buildSchemaOptions)=>{
    const { disableUnique, draftsEnabled, indexSortableFields } = buildSchemaOptions;
    const schema = {
        index: field.index || !disableUnique && field.unique || indexSortableFields || false,
        required: false,
        unique: !disableUnique && field.unique || false
    };
    if (schema.unique && (field.localized || draftsEnabled || fieldAffectsData(field) && field.type !== 'group' && field.type !== 'tab' && field.required !== true)) {
        schema.sparse = true;
    }
    if (field.hidden) {
        schema.hidden = true;
    }
    return schema;
};
const localizeSchema = (entity, schema, localization)=>{
    if (fieldIsLocalized(entity) && localization && Array.isArray(localization.locales)) {
        return {
            type: localization.localeCodes.reduce((localeSchema, locale)=>({
                    ...localeSchema,
                    [locale]: schema
                }), {
                _id: false
            }),
            localized: true
        };
    }
    return schema;
};
const buildSchema = (config, configFields, buildSchemaOptions = {})=>{
    const { allowIDField, options } = buildSchemaOptions;
    let fields = {};
    let schemaFields = configFields;
    if (!allowIDField) {
        const idField = schemaFields.find((field)=>fieldAffectsData(field) && field.name === 'id');
        if (idField) {
            fields = {
                _id: idField.type === 'number' ? Number : String
            };
            schemaFields = schemaFields.filter((field)=>!(fieldAffectsData(field) && field.name === 'id'));
        }
    }
    const schema = new mongoose.Schema(fields, options);
    schemaFields.forEach((field)=>{
        if (!fieldIsPresentationalOnly(field)) {
            const addFieldSchema = fieldToSchemaMap[field.type];
            if (addFieldSchema) {
                addFieldSchema(field, schema, config, buildSchemaOptions);
            }
        }
    });
    return schema;
};
const fieldToSchemaMap = {
    array: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: [
                buildSchema(config, field.fields, {
                    allowIDField: true,
                    disableUnique: buildSchemaOptions.disableUnique,
                    draftsEnabled: buildSchemaOptions.draftsEnabled,
                    options: {
                        _id: false,
                        id: false,
                        minimize: false
                    }
                })
            ],
            default: undefined
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    blocks: (field, schema, config, buildSchemaOptions)=>{
        const fieldSchema = {
            type: [
                new mongoose.Schema({}, {
                    _id: false,
                    discriminatorKey: 'blockType'
                })
            ],
            default: undefined
        };
        schema.add({
            [field.name]: localizeSchema(field, fieldSchema, config.localization)
        });
        field.blocks.forEach((blockItem)=>{
            const blockSchema = new mongoose.Schema({}, {
                _id: false,
                id: false
            });
            blockItem.fields.forEach((blockField)=>{
                const addFieldSchema = fieldToSchemaMap[blockField.type];
                if (addFieldSchema) {
                    addFieldSchema(blockField, blockSchema, config, buildSchemaOptions);
                }
            });
            if (field.localized && config.localization) {
                config.localization.localeCodes.forEach((localeCode)=>{
                    // @ts-expect-error Possible incorrect typing in mongoose types, this works
                    schema.path(`${field.name}.${localeCode}`).discriminator(blockItem.slug, blockSchema);
                });
            } else {
                // @ts-expect-error Possible incorrect typing in mongoose types, this works
                schema.path(field.name).discriminator(blockItem.slug, blockSchema);
            }
        });
    },
    checkbox: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: Boolean
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    code: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    collapsible: (field, schema, config, buildSchemaOptions)=>{
        field.fields.forEach((subField)=>{
            const addFieldSchema = fieldToSchemaMap[subField.type];
            if (addFieldSchema) {
                addFieldSchema(subField, schema, config, buildSchemaOptions);
            }
        });
    },
    date: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: Date
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    email: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    group: (field, schema, config, buildSchemaOptions)=>{
        const formattedBaseSchema = formatBaseSchema(field, buildSchemaOptions);
        // carry indexSortableFields through to versions if drafts enabled
        const indexSortableFields = buildSchemaOptions.indexSortableFields && field.name === 'version' && buildSchemaOptions.draftsEnabled;
        const baseSchema = {
            ...formattedBaseSchema,
            type: buildSchema(config, field.fields, {
                disableUnique: buildSchemaOptions.disableUnique,
                draftsEnabled: buildSchemaOptions.draftsEnabled,
                indexSortableFields,
                options: {
                    _id: false,
                    id: false,
                    minimize: false
                }
            })
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    json: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: mongoose.Schema.Types.Mixed
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    number: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: field.hasMany ? [
                Number
            ] : Number
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    point: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            type: {
                type: String,
                enum: [
                    'Point'
                ]
            },
            coordinates: {
                type: [
                    Number
                ],
                default: field.defaultValue || undefined,
                required: false
            }
        };
        if (buildSchemaOptions.disableUnique && field.unique && field.localized) {
            baseSchema.coordinates.sparse = true;
        }
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
        if (field.index === true || field.index === undefined) {
            const indexOptions = {};
            if (!buildSchemaOptions.disableUnique && field.unique) {
                indexOptions.sparse = true;
                indexOptions.unique = true;
            }
            if (field.localized && config.localization) {
                config.localization.locales.forEach((locale)=>{
                    schema.index({
                        [`${field.name}.${locale.code}`]: '2dsphere'
                    }, indexOptions);
                });
            } else {
                schema.index({
                    [field.name]: '2dsphere'
                }, indexOptions);
            }
        }
    },
    radio: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String,
            enum: field.options.map((option)=>{
                if (typeof option === 'object') return option.value;
                return option;
            })
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    relationship: (field, schema, config, buildSchemaOptions)=>{
        const hasManyRelations = Array.isArray(field.relationTo);
        let schemaToReturn = {};
        if (field.localized && config.localization) {
            schemaToReturn = {
                type: config.localization.localeCodes.reduce((locales, locale)=>{
                    let localeSchema = {};
                    if (hasManyRelations) {
                        localeSchema = {
                            ...formatBaseSchema(field, buildSchemaOptions),
                            _id: false,
                            type: mongoose.Schema.Types.Mixed,
                            relationTo: {
                                type: String,
                                enum: field.relationTo
                            },
                            value: {
                                type: mongoose.Schema.Types.Mixed,
                                refPath: `${field.name}.${locale}.relationTo`
                            }
                        };
                    } else {
                        localeSchema = {
                            ...formatBaseSchema(field, buildSchemaOptions),
                            type: mongoose.Schema.Types.Mixed,
                            ref: field.relationTo
                        };
                    }
                    return {
                        ...locales,
                        [locale]: field.hasMany ? {
                            type: [
                                localeSchema
                            ],
                            default: undefined
                        } : localeSchema
                    };
                }, {}),
                localized: true
            };
        } else if (hasManyRelations) {
            schemaToReturn = {
                ...formatBaseSchema(field, buildSchemaOptions),
                _id: false,
                type: mongoose.Schema.Types.Mixed,
                relationTo: {
                    type: String,
                    enum: field.relationTo
                },
                value: {
                    type: mongoose.Schema.Types.Mixed,
                    refPath: `${field.name}.relationTo`
                }
            };
            if (field.hasMany) {
                schemaToReturn = {
                    type: [
                        schemaToReturn
                    ],
                    default: undefined
                };
            }
        } else {
            schemaToReturn = {
                ...formatBaseSchema(field, buildSchemaOptions),
                type: mongoose.Schema.Types.Mixed,
                ref: field.relationTo
            };
            if (field.hasMany) {
                schemaToReturn = {
                    type: [
                        schemaToReturn
                    ],
                    default: undefined
                };
            }
        }
        schema.add({
            [field.name]: schemaToReturn
        });
    },
    richText: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: mongoose.Schema.Types.Mixed
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    row: (field, schema, config, buildSchemaOptions)=>{
        field.fields.forEach((subField)=>{
            const addFieldSchema = fieldToSchemaMap[subField.type];
            if (addFieldSchema) {
                addFieldSchema(subField, schema, config, buildSchemaOptions);
            }
        });
    },
    select: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String,
            enum: field.options.map((option)=>{
                if (typeof option === 'object') return option.value;
                return option;
            })
        };
        if (buildSchemaOptions.draftsEnabled || !field.required) {
            baseSchema.enum.push(null);
        }
        schema.add({
            [field.name]: localizeSchema(field, field.hasMany ? [
                baseSchema
            ] : baseSchema, config.localization)
        });
    },
    tabs: (field, schema, config, buildSchemaOptions)=>{
        field.tabs.forEach((tab)=>{
            if (tabHasName(tab)) {
                const baseSchema = {
                    type: buildSchema(config, tab.fields, {
                        disableUnique: buildSchemaOptions.disableUnique,
                        draftsEnabled: buildSchemaOptions.draftsEnabled,
                        options: {
                            _id: false,
                            id: false,
                            minimize: false
                        }
                    })
                };
                schema.add({
                    [tab.name]: localizeSchema(tab, baseSchema, config.localization)
                });
            } else {
                tab.fields.forEach((subField)=>{
                    const addFieldSchema = fieldToSchemaMap[subField.type];
                    if (addFieldSchema) {
                        addFieldSchema(subField, schema, config, buildSchemaOptions);
                    }
                });
            }
        });
    },
    text: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: field.hasMany ? [
                String
            ] : String
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    textarea: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    },
    upload: (field, schema, config, buildSchemaOptions)=>{
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: mongoose.Schema.Types.Mixed,
            ref: field.relationTo
        };
        schema.add({
            [field.name]: localizeSchema(field, baseSchema, config.localization)
        });
    }
};
export default buildSchema;

//# sourceMappingURL=buildSchema.js.map