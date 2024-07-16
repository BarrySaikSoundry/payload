import { getTranslation } from '@payloadcms/translations';
export var EntityType;
(function(EntityType) {
    EntityType["collection"] = "collections";
    EntityType["global"] = "globals";
})(EntityType || (EntityType = {}));
export function groupNavItems(entities, permissions, i18n) {
    const result = entities.reduce((groups, entityToGroup)=>{
        if (permissions?.[entityToGroup.type.toLowerCase()]?.[entityToGroup.entity.slug]?.read.permission) {
            const translatedGroup = getTranslation(entityToGroup.entity.admin.group, i18n);
            if (entityToGroup.entity.admin.group) {
                const existingGroup = groups.find((group)=>getTranslation(group.label, i18n) === translatedGroup);
                let matchedGroup = existingGroup;
                if (!existingGroup) {
                    matchedGroup = {
                        entities: [],
                        label: translatedGroup
                    };
                    groups.push(matchedGroup);
                }
                matchedGroup.entities.push(entityToGroup);
            } else {
                const defaultGroup = groups.find((group)=>{
                    return getTranslation(group.label, i18n) === i18n.t(`general:${entityToGroup.type}`);
                });
                defaultGroup.entities.push(entityToGroup);
            }
        }
        return groups;
    }, [
        {
            entities: [],
            label: i18n.t('general:collections')
        },
        {
            entities: [],
            label: i18n.t('general:globals')
        }
    ]);
    return result.filter((group)=>group.entities.length > 0);
}

//# sourceMappingURL=groupNavItems.js.map