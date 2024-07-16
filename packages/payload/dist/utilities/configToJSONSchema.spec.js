import { sanitizeConfig } from '../config/sanitize.js';
import { configToJSONSchema } from './configToJSONSchema.js';
describe('configToJSONSchema', ()=>{
    it('should handle optional arrays with required fields', async ()=>{
        // @ts-expect-error
        const config = {
            collections: [
                {
                    slug: 'test',
                    fields: [
                        {
                            name: 'someRequiredField',
                            type: 'array',
                            fields: [
                                {
                                    name: 'someRequiredField',
                                    type: 'text',
                                    required: true
                                }
                            ]
                        }
                    ],
                    timestamps: false
                }
            ]
        };
        const sanitizedConfig = await sanitizeConfig(config);
        const schema = configToJSONSchema(sanitizedConfig, 'text');
        expect(schema?.definitions?.test).toStrictEqual({
            type: 'object',
            additionalProperties: false,
            properties: {
                id: {
                    type: 'string'
                },
                someRequiredField: {
                    type: [
                        'array',
                        'null'
                    ],
                    items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            id: {
                                type: [
                                    'string',
                                    'null'
                                ]
                            },
                            someRequiredField: {
                                type: 'string'
                            }
                        },
                        required: [
                            'someRequiredField'
                        ]
                    }
                }
            },
            required: [
                'id'
            ],
            title: 'Test'
        });
    });
    it('should handle tabs and named tabs with required fields', async ()=>{
        // @ts-expect-error
        const config = {
            collections: [
                {
                    slug: 'test',
                    fields: [
                        {
                            type: 'tabs',
                            tabs: [
                                {
                                    fields: [
                                        {
                                            name: 'fieldInUnnamedTab',
                                            type: 'text'
                                        }
                                    ],
                                    label: 'unnamedTab'
                                },
                                {
                                    name: 'namedTab',
                                    fields: [
                                        {
                                            name: 'fieldInNamedTab',
                                            type: 'text'
                                        }
                                    ],
                                    label: 'namedTab'
                                },
                                {
                                    name: 'namedTabWithRequired',
                                    fields: [
                                        {
                                            name: 'fieldInNamedTab',
                                            type: 'text',
                                            required: true
                                        }
                                    ],
                                    label: 'namedTabWithRequired'
                                }
                            ]
                        }
                    ],
                    timestamps: false
                }
            ]
        };
        const sanitizedConfig = await sanitizeConfig(config);
        const schema = configToJSONSchema(sanitizedConfig, 'text');
        expect(schema?.definitions?.test).toStrictEqual({
            type: 'object',
            additionalProperties: false,
            properties: {
                id: {
                    type: 'string'
                },
                fieldInUnnamedTab: {
                    type: [
                        'string',
                        'null'
                    ]
                },
                namedTab: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        fieldInNamedTab: {
                            type: [
                                'string',
                                'null'
                            ]
                        }
                    },
                    required: []
                },
                namedTabWithRequired: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        fieldInNamedTab: {
                            type: 'string'
                        }
                    },
                    required: [
                        'fieldInNamedTab'
                    ]
                }
            },
            required: [
                'id',
                'namedTabWithRequired'
            ],
            title: 'Test'
        });
    });
    it('should handle custom typescript schema and JSON field schema', async ()=>{
        const customSchema = {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                },
                required: [
                    'id'
                ]
            }
        };
        const config = {
            collections: [
                {
                    slug: 'test',
                    fields: [
                        {
                            name: 'withCustom',
                            type: 'text',
                            typescriptSchema: [
                                ()=>customSchema
                            ]
                        },
                        {
                            name: 'jsonWithSchema',
                            type: 'json',
                            jsonSchema: {
                                fileMatch: [
                                    'a://b/foo.json'
                                ],
                                schema: customSchema,
                                uri: 'a://b/foo.json'
                            }
                        }
                    ],
                    timestamps: false
                }
            ]
        };
        const sanitizedConfig = await sanitizeConfig(config);
        const schema = configToJSONSchema(sanitizedConfig, 'text');
        expect(schema?.definitions?.test).toStrictEqual({
            type: 'object',
            additionalProperties: false,
            properties: {
                id: {
                    type: 'string'
                },
                jsonWithSchema: customSchema,
                withCustom: customSchema
            },
            required: [
                'id'
            ],
            title: 'Test'
        });
    });
});

//# sourceMappingURL=configToJSONSchema.spec.js.map