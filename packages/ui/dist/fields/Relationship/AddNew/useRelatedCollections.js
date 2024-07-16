import { useState } from 'react';
import { useConfig } from '../../../providers/Config/index.js';
export const useRelatedCollections = (relationTo)=>{
    const config = useConfig();
    const [relatedCollections] = useState(()=>{
        if (relationTo) {
            const relations = typeof relationTo === 'string' ? [
                relationTo
            ] : relationTo;
            return relations.map((relation)=>config.collections.find((collection)=>collection.slug === relation));
        }
        return [];
    });
    return relatedCollections;
};

//# sourceMappingURL=useRelatedCollections.js.map