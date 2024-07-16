import { validateUrl } from '../../../lexical/utils/url.js';
export const getBaseFields = (config, enabledCollections, disabledCollections, maxDepth)=>{
    let enabledRelations;
    /**
   * Figure out which relations should be enabled (enabledRelations) based on a collection's admin.enableRichTextLink property,
   * or the Link Feature's enabledCollections and disabledCollections properties which override it.
   */ if (enabledCollections) {
        enabledRelations = enabledCollections;
    } else if (disabledCollections) {
        enabledRelations = config.collections.filter(({ slug })=>!disabledCollections.includes(slug)).map(({ slug })=>slug);
    } else {
        enabledRelations = config.collections.filter(({ admin: { enableRichTextLink, hidden } })=>{
            if (typeof hidden !== 'function' && hidden) {
                return false;
            }
            return enableRichTextLink;
        }).map(({ slug })=>slug);
    }
    const baseFields = [
        {
            name: 'text',
            type: 'text',
            label: ({ t })=>t('fields:textToDisplay'),
            required: true
        },
        {
            name: 'linkType',
            type: 'radio',
            admin: {
                description: ({ t })=>t('fields:chooseBetweenCustomTextOrDocument')
            },
            defaultValue: 'custom',
            label: ({ t })=>t('fields:linkType'),
            options: [
                {
                    label: ({ t })=>t('fields:customURL'),
                    value: 'custom'
                }
            ],
            required: true
        },
        {
            name: 'url',
            type: 'text',
            label: ({ t })=>t('fields:enterURL'),
            required: true,
            validate: (value)=>{
                if (!validateUrl(value)) {
                    return 'Invalid URL';
                }
            }
        }
    ];
    // Only display internal link-specific fields / options / conditions if there are enabled relations
    if (enabledRelations?.length) {
        baseFields[1].options.push({
            label: ({ t })=>t('fields:internalLink'),
            value: 'internal'
        });
        baseFields[2].admin = {
            condition: ({ linkType })=>linkType !== 'internal'
        };
        baseFields.push({
            name: 'doc',
            admin: {
                condition: ({ linkType })=>{
                    return linkType === 'internal';
                }
            },
            // when admin.hidden is a function we need to dynamically call hidden with the user to know if the collection should be shown
            type: 'relationship',
            filterOptions: !enabledCollections && !disabledCollections ? ({ relationTo, user })=>{
                const hidden = config.collections.find(({ slug })=>slug === relationTo).admin.hidden;
                if (typeof hidden === 'function' && hidden({
                    user
                })) {
                    return false;
                }
            } : null,
            label: ({ t })=>t('fields:chooseDocumentToLink'),
            maxDepth,
            relationTo: enabledRelations,
            required: true
        });
    }
    baseFields.push({
        name: 'newTab',
        type: 'checkbox',
        label: ({ t })=>t('fields:openInNewTab')
    });
    return baseFields;
};

//# sourceMappingURL=baseFields.js.map