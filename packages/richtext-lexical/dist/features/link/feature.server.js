import { sanitizeFields } from 'payload';
import { deepCopyObject } from 'payload/shared';
// eslint-disable-next-line payload/no-imports-from-exports-dir
import { LinkFeatureClient } from '../../exports/client/index.js';
import { createServerFeature } from '../../utilities/createServerFeature.js';
import { convertLexicalNodesToHTML } from '../converters/html/converter/index.js';
import { createNode } from '../typeUtilities.js';
import { linkPopulationPromiseHOC } from './graphQLPopulationPromise.js';
import { i18n } from './i18n.js';
import { LinkMarkdownTransformer } from './markdownTransformer.js';
import { AutoLinkNode } from './nodes/AutoLinkNode.js';
import { LinkNode } from './nodes/LinkNode.js';
import { transformExtraFields } from './plugins/floatingLinkEditor/utilities.js';
import { linkValidation } from './validate.js';
export const LinkFeature = createServerFeature({
    feature: async ({ config: _config, isRoot, props })=>{
        if (!props) {
            props = {};
        }
        const validRelationships = _config.collections.map((c)=>c.slug) || [];
        const _transformedFields = transformExtraFields(deepCopyObject(props.fields), _config, props.enabledCollections, props.disabledCollections, props.maxDepth);
        const sanitizedFields = await sanitizeFields({
            config: _config,
            fields: _transformedFields,
            requireFieldLevelRichTextEditor: isRoot,
            validRelationships
        });
        props.fields = sanitizedFields;
        // the text field is not included in the node data.
        // Thus, for tasks like validation, we do not want to pass it a text field in the schema which will never have data.
        // Otherwise, it will cause a validation error (field is required).
        const sanitizedFieldsWithoutText = deepCopyObject(sanitizedFields).filter((field)=>field.name !== 'text');
        return {
            ClientFeature: LinkFeatureClient,
            clientFeatureProps: {
                disabledCollections: props.disabledCollections,
                enabledCollections: props.enabledCollections
            },
            generateSchemaMap: ()=>{
                if (!sanitizedFields || !Array.isArray(sanitizedFields) || sanitizedFields.length === 0) {
                    return null;
                }
                const schemaMap = new Map();
                schemaMap.set('fields', sanitizedFields);
                return schemaMap;
            },
            i18n,
            markdownTransformers: [
                LinkMarkdownTransformer
            ],
            nodes: [
                createNode({
                    converters: {
                        html: {
                            converter: async ({ converters, node, parent, req })=>{
                                const childrenText = await convertLexicalNodesToHTML({
                                    converters,
                                    lexicalNodes: node.children,
                                    parent: {
                                        ...node,
                                        parent
                                    },
                                    req
                                });
                                const rel = node.fields.newTab ? ' rel="noopener noreferrer"' : '';
                                const target = node.fields.newTab ? ' target="_blank"' : '';
                                let href = node.fields.url;
                                if (node.fields.linkType === 'internal') {
                                    href = typeof node.fields.doc?.value === 'string' ? node.fields.doc?.value : node.fields.doc?.value?.id;
                                }
                                return `<a href="${href}"${target}${rel}>${childrenText}</a>`;
                            },
                            nodeTypes: [
                                AutoLinkNode.getType()
                            ]
                        }
                    },
                    node: AutoLinkNode,
                    // Since AutoLinkNodes are just internal links, they need no hooks or graphQL population promises
                    validations: [
                        linkValidation(props, sanitizedFieldsWithoutText)
                    ]
                }),
                createNode({
                    converters: {
                        html: {
                            converter: async ({ converters, node, parent, req })=>{
                                const childrenText = await convertLexicalNodesToHTML({
                                    converters,
                                    lexicalNodes: node.children,
                                    parent: {
                                        ...node,
                                        parent
                                    },
                                    req
                                });
                                const rel = node.fields.newTab ? ' rel="noopener noreferrer"' : '';
                                const target = node.fields.newTab ? ' target="_blank"' : '';
                                const href = node.fields.linkType === 'custom' ? node.fields.url : node.fields.doc?.value;
                                return `<a href="${href}"${target}${rel}>${childrenText}</a>`;
                            },
                            nodeTypes: [
                                LinkNode.getType()
                            ]
                        }
                    },
                    getSubFields: ()=>{
                        return sanitizedFieldsWithoutText;
                    },
                    getSubFieldsData: ({ node })=>{
                        return node?.fields;
                    },
                    graphQLPopulationPromises: [
                        linkPopulationPromiseHOC(props)
                    ],
                    node: LinkNode,
                    validations: [
                        linkValidation(props, sanitizedFieldsWithoutText)
                    ]
                })
            ],
            sanitizedServerFeatureProps: props
        };
    },
    key: 'link'
});

//# sourceMappingURL=feature.server.js.map