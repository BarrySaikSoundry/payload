import { getDefaultValue } from 'payload';
import { fieldAffectsData, tabHasName } from 'payload/shared';
import { iterateFields } from './iterateFields.js';
// TODO: Make this works for rich text subfields
export const defaultValuePromise = async ({ id, data, field, locale, siblingData, user })=>{
    if (fieldAffectsData(field)) {
        if (typeof siblingData[field.name] === 'undefined' && typeof field.defaultValue !== 'undefined') {
            siblingData[field.name] = await getDefaultValue({
                defaultValue: field.defaultValue,
                locale,
                user,
                value: siblingData[field.name]
            });
        }
    }
    // Traverse subfields
    switch(field.type){
        case 'group':
            {
                if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                const groupData = siblingData[field.name];
                await iterateFields({
                    id,
                    data,
                    fields: field.fields,
                    locale,
                    siblingData: groupData,
                    user
                });
                break;
            }
        case 'array':
            {
                const rows = siblingData[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row)=>{
                        promises.push(iterateFields({
                            id,
                            data,
                            fields: field.fields,
                            locale,
                            siblingData: row,
                            user
                        }));
                    });
                    await Promise.all(promises);
                }
                break;
            }
        case 'blocks':
            {
                const rows = siblingData[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row)=>{
                        const blockTypeToMatch = row.blockType;
                        const block = field.blocks.find((blockType)=>blockType.slug === blockTypeToMatch);
                        if (block) {
                            row.blockType = blockTypeToMatch;
                            promises.push(iterateFields({
                                id,
                                data,
                                fields: block.fields,
                                locale,
                                siblingData: row,
                                user
                            }));
                        }
                    });
                    await Promise.all(promises);
                }
                break;
            }
        case 'row':
        case 'collapsible':
            {
                await iterateFields({
                    id,
                    data,
                    fields: field.fields,
                    locale,
                    siblingData,
                    user
                });
                break;
            }
        case 'tab':
            {
                let tabSiblingData;
                if (tabHasName(field)) {
                    if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                    tabSiblingData = siblingData[field.name];
                } else {
                    tabSiblingData = siblingData;
                }
                await iterateFields({
                    id,
                    data,
                    fields: field.fields,
                    locale,
                    siblingData: tabSiblingData,
                    user
                });
                break;
            }
        case 'tabs':
            {
                await iterateFields({
                    id,
                    data,
                    fields: field.tabs.map((tab)=>({
                            ...tab,
                            type: 'tab'
                        })),
                    locale,
                    siblingData,
                    user
                });
                break;
            }
        default:
            {
                break;
            }
    }
};

//# sourceMappingURL=promise.js.map