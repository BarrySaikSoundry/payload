/* eslint-disable no-param-reassign */ import { createBlocksMap } from '../../utilities/createBlocksMap.js';
import { createPathMap } from '../../utilities/createRelationshipMap.js';
import { traverseFields } from './traverseFields.js';
// This is the entry point to transform Drizzle output data
// into the shape Payload expects based on field schema
export const transform = ({ adapter, config, data, fields })=>{
    let relationships = {};
    let texts = {};
    let numbers = {};
    if ('_rels' in data) {
        relationships = createPathMap(data._rels);
        delete data._rels;
    }
    if ('_texts' in data) {
        texts = createPathMap(data._texts);
        delete data._texts;
    }
    if ('_numbers' in data) {
        numbers = createPathMap(data._numbers);
        delete data._numbers;
    }
    const blocks = createBlocksMap(data);
    const deletions = [];
    const result = traverseFields({
        adapter,
        blocks,
        config,
        dataRef: {
            id: data.id
        },
        deletions,
        fieldPrefix: '',
        fields,
        numbers,
        path: '',
        relationships,
        table: data,
        texts
    });
    deletions.forEach((deletion)=>deletion());
    return result;
};

//# sourceMappingURL=index.js.map