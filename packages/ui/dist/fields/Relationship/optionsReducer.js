import { getTranslation } from '@payloadcms/translations';
import { formatDocTitle } from '../../utilities/formatDocTitle.js';
const reduceToIDs = (options)=>options.reduce((ids, option)=>{
        if (option.options) {
            return [
                ...ids,
                ...reduceToIDs(option.options)
            ];
        }
        return [
            ...ids,
            {
                id: option.value,
                relationTo: option.relationTo
            }
        ];
    }, []);
const sortOptions = (options)=>options.sort((a, b)=>{
        if (typeof a?.label?.localeCompare === 'function' && typeof b?.label?.localeCompare === 'function') {
            return a.label.localeCompare(b.label);
        }
        return 0;
    });
export const optionsReducer = (state, action)=>{
    switch(action.type){
        case 'CLEAR':
            {
                return [];
            }
        case 'UPDATE':
            {
                const { collection, config, doc, i18n } = action;
                const relation = collection.slug;
                const newOptions = [
                    ...state
                ];
                const docTitle = formatDocTitle({
                    collectionConfig: collection,
                    data: doc,
                    dateFormat: config.admin.dateFormat,
                    fallback: `${i18n.t('general:untitled')} - ID: ${doc.id}`,
                    i18n
                });
                const foundOptionGroup = newOptions.find((optionGroup)=>optionGroup.label === collection.labels.plural);
                const foundOption = foundOptionGroup?.options?.find((option)=>option.value === doc.id);
                if (foundOption) {
                    foundOption.label = docTitle;
                    foundOption.relationTo = relation;
                }
                return newOptions;
            }
        case 'ADD':
            {
                const { collection, config, docs, i18n, ids = [], sort } = action;
                const relation = collection.slug;
                const loadedIDs = reduceToIDs(state);
                const newOptions = [
                    ...state
                ];
                const optionsToAddTo = newOptions.find((optionGroup)=>optionGroup.label === collection.labels.plural);
                const newSubOptions = docs.reduce((docSubOptions, doc)=>{
                    if (loadedIDs.filter((item)=>item.id === doc.id && item.relationTo === relation).length === 0) {
                        loadedIDs.push({
                            id: doc.id,
                            relationTo: relation
                        });
                        const docTitle = formatDocTitle({
                            collectionConfig: collection,
                            data: doc,
                            dateFormat: config.admin.dateFormat,
                            fallback: `${i18n.t('general:untitled')} - ID: ${doc.id}`,
                            i18n
                        });
                        return [
                            ...docSubOptions,
                            {
                                label: docTitle,
                                relationTo: relation,
                                value: doc.id
                            }
                        ];
                    }
                    return docSubOptions;
                }, []);
                ids.forEach((id)=>{
                    if (loadedIDs.filter((item)=>item.id === id && item.relationTo === relation).length === 0) {
                        loadedIDs.push({
                            id,
                            relationTo: relation
                        });
                        newSubOptions.push({
                            label: `${i18n.t('general:untitled')} - ID: ${id}`,
                            relationTo: relation,
                            value: id
                        });
                    }
                });
                if (optionsToAddTo) {
                    const subOptions = [
                        ...optionsToAddTo.options,
                        ...newSubOptions
                    ];
                    optionsToAddTo.options = sort ? sortOptions(subOptions) : subOptions;
                } else {
                    newOptions.push({
                        label: getTranslation(collection.labels.plural, i18n),
                        options: sort ? sortOptions(newSubOptions) : newSubOptions
                    });
                }
                return newOptions;
            }
        default:
            {
                return state;
            }
    }
};

//# sourceMappingURL=optionsReducer.js.map