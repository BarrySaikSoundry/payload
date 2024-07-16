// eslint-disable-next-line payload/no-imports-from-exports-dir
import { RelationshipFeatureClient } from '../../exports/client/index.js';
import { populate } from '../../populateGraphQL/populate.js';
import { createServerFeature } from '../../utilities/createServerFeature.js';
import { createNode } from '../typeUtilities.js';
import { relationshipPopulationPromiseHOC } from './graphQLPopulationPromise.js';
import { i18n } from './i18n.js';
import { RelationshipNode } from './nodes/RelationshipNode.js';
export const RelationshipFeature = createServerFeature({
    feature: ({ props })=>({
            ClientFeature: RelationshipFeatureClient,
            i18n,
            nodes: [
                createNode({
                    graphQLPopulationPromises: [
                        relationshipPopulationPromiseHOC(props)
                    ],
                    hooks: {
                        afterRead: [
                            ({ currentDepth, depth, draft, node, overrideAccess, populationPromises, req, showHiddenFields })=>{
                                if (!node?.value) {
                                    return node;
                                }
                                const collection = req.payload.collections[node?.relationTo];
                                if (!collection) {
                                    return node;
                                }
                                // @ts-expect-error
                                const id = node?.value?.id || node?.value // for backwards-compatibility
                                ;
                                const populateDepth = props?.maxDepth !== undefined && props?.maxDepth < depth ? props?.maxDepth : depth;
                                populationPromises.push(populate({
                                    id,
                                    collectionSlug: collection.config.slug,
                                    currentDepth,
                                    data: node,
                                    depth: populateDepth,
                                    draft,
                                    key: 'value',
                                    overrideAccess,
                                    req,
                                    showHiddenFields
                                }));
                                return node;
                            }
                        ]
                    },
                    node: RelationshipNode
                })
            ]
        }),
    key: 'relationship'
});

//# sourceMappingURL=feature.server.js.map